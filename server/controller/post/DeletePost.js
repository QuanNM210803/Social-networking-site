const Post=require('../../models/PostModel')
async function deletePost(request,response){
   try{
      const {postId}=request?.body
      const post=await Post.findById(postId)
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }
      await Post.deleteOne({_id:postId})
      return response.status(200).json({
         message:'Post deleted successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=deletePost