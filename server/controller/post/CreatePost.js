const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
const cloudinary=require('cloudinary').v2

async function createPost(request,response){
   try{
      const {poster,content}=request.body
      const text=content?.text || ''
      const image=content?.image || []
      const video=content?.video || []
      const userId=poster

      const user=await User.findById(userId)
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      if(!text && !image?.length && !video?.length){
         return response.status(400).json({
            message:'Post requires content',
            error:true
         })
      }
      if(image?.length){
         for(let i=0;i<image.length;i++){
            const uploadResponse=await cloudinary.uploader.upload(image[i])
            image[i]=uploadResponse.secure_url
         }
      }
      if(video?.length){
         for(let i=0;i<video.length;i++){
            const uploadResponse=await cloudinary.uploader.upload(video[i])
            video[i]=uploadResponse.secure_url
         }
      }
      const newPost=new Post({
         poster:userId,
         content:{
            text,
            image,
            video
         }
      })
      await newPost.save()
      return response.status(201).json(newPost)
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=createPost