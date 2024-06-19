const Group=require('../../models/GroupModel')
const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
const createPost = require('../post/CreatePost')
async function createPostInGroup(request, response){
   try{
      const {groupId, posterId, content}=request?.body
      const text=content?.text || ''
      const image=content?.image || []
      const video=content?.video || []

      const group=await Group.findById(groupId)
      const user=await User.findById(posterId)
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      if(!group?.members.includes(posterId)){
         return response.status(403).json({
            message:'User is not a member of the group',
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
         poster:posterId,
         content:{
            text,
            image,
            video
         }
      })
      await newPost.save()
      group?.posts?.push(newPost?._id)
      await group.save()

      return response.status(201).json({
         data:newPost,
         message:'Post created in group successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}
module.exports=createPostInGroup