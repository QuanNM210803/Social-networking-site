const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
const Comment=require('../../models/CommentModel')
const cloudinary=require('cloudinary').v2

async function createComment(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const commenterId=user?._id.toString()  
      const {postId, content}=request?.body
      const text=content?.text || ''
      let image=content?.image || ''
      let video=content?.video || ''
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
      
      if(image){
         const uploadImageResponse=await cloudinary.uploader.upload(image)
         image=uploadImageResponse.secure_url
      }
      if(video){
         const uploadVideoResponse=await cloudinary.uploader.upload(video)
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
   }catch(error){
      return response.status(500).json({
         message: error.message || error,
         error:true
      })
   }
}
module.exports=createComment