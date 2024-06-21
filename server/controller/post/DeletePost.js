const Post=require('../../models/PostModel')
async function deletePost(request,response){
   try{
      const user=request?.user
      const {postId}=request?.body
      const post=await Post.findById(postId)
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }
      if(post?.poster?.toString()!==user?._id.toString()){
         return response.status(403).json({
            message:'Unauthorized',
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