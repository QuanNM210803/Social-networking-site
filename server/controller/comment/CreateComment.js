const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
const Group=require('../../models/GroupModel')
const Comment=require('../../models/CommentModel')
const cloudinary=require('cloudinary').v2
const path=require('path')
const fs=require('fs')
const multer=require('multer')
const protectRouter=require('../../routes/ProtectRouter')
const express=require('express')
const createAComment=express.Router()

const uploadDir=path.join(__dirname,'uploads')
if(!fs.existsSync(uploadDir)){
   fs.mkdirSync(uploadDir)
}
const upload = multer({ dest:uploadDir})
const createComment=async(request, response)=>{
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const commenterId=user?._id.toString()  
      const {postId, text}=request?.body
      let image=request?.files['image']?.[0] || null
      let video=request?.files['video']?.[0] || null
      
      if(!text && !image && !video){
         return response.status(400).json({
            message:'Request content comment',
            error:true
         })
      }
      const post=await Post.findById(postId)
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }

      // postInGroup
      const postInGroup=await Group.findOne({
         posts:postId
      })

      if((postInGroup && postInGroup?.members?.includes(commenterId)) || !postInGroup || postInGroup?.privacy==='public'){
         if(image){
            const uploadImageResponse=await cloudinary.uploader.upload(image.path)
            image=uploadImageResponse.secure_url
         }
         if(video){
            const uploadVideoResponse=await cloudinary.uploader.upload(video.path,{resource_type:'video'})
            video=uploadVideoResponse.secure_url
         }
   
         const comment=new Comment({
            commenter:commenterId,
            content:{
               text,
               image,
               video
            }
         })
         await comment.save()
         await Post.updateOne(
            {
               _id:postId
            },
            {
               $push:{
                  comments:comment._id
               }
            }
         )
         return response.status(201).json({
            message:'Comment created successfully',
            success:true
         })
      }else{
         return response.status(403).json({
            message:'You are not allowed to comment on this post',
            error:true
         })
      }
   }catch(error){
      return response.status(500).json({
         message: error.message || error,
         error:true
      })
   }
}

createAComment.post('/create-comment',protectRouter,upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]),createComment)
module.exports=createAComment