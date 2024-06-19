const Post=require('../../models/PostModel')
async function getCommentsByPostId(request, response){
   try{
      const postId=request?.params?.postId
      const post=await Post.findById(postId).populate({
         path:'comments',
         populate:{
            path:'commenter',
            select:'_id name profile_pic'
         }
      })
      if(!post){
         return response.status(404).json({
            message:'Post not found',
            error:true
         })
      }
      const comments=post?.comments || []
      return response.status(200).json({
         data: comments,
         message:'Comments fetched successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=getCommentsByPostId