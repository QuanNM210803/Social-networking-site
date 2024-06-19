const Post=require('../../models/PostModel')
async function getLikeByPostId(request, response){
   try{
      const {postId}=request?.body
      const post=await Post.findById(postId).populate('likes','name _id profile_pic')
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }
      const likes=post?.likes || []
      return response.status(200).json({
         data: likes,
         message:'Like fetched successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=getLikeByPostId