const Comment=require('../../models/CommentModel')
async function getLikeByCommentId(request, response){
   try{
      const {commentId}=request?.body
      const comment=await Comment.findById(commentId).populate({
         path:'likes',
         select:'name _id profile_pic'
      })
      if(!comment){
         return response.status(404).json({
            message:'Comment not found',
            error:true
         })
      }
      const likes=comment?.likes || []
      return response.status(200).json({
         data: likes,
         message:'Comment fetched successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=getLikeByCommentId