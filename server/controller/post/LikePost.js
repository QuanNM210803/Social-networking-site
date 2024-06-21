const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')

async function likePost(request, response){
   try{
      const {postId}=request?.body
      const user=request?.user
      const post=await Post.findById(postId)
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }
      const userId=user?._id.toString()
      if(!post?.likes?.includes(userId)){
         await Post.updateOne(
            {
               _id:postId
            },
            {
               $push:{
                  likes:userId
               }
            }
         )
         return response.status(200).json({
            message:'Post liked successfully',
            success:true
         })
      }else{
         await Post.updateOne(
            {
               _id:postId
            },
            {
               $pull:{
                  likes:userId
               }
            }
         )
         return response.status(200).json({
            message:'Post unliked successfully',
            success:true
         })
      }
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}
module.exports=likePost