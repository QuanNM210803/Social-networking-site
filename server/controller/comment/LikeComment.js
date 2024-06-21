const User=require('../../models/UserModel')
const Comment=require('../../models/CommentModel')

async function likeComment(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const userId=user?._id.toString()
      const {commentId}=request?.body
      const comment=await Comment.findById(commentId)
      if(!comment){
         return response.status(404).json({
            message:'Comment not found',
            error:true
         })
      }
      if(!comment?.likes?.includes(userId)){
         await Comment.updateOne(
            {
               _id:commentId
            },
            {
               $push:{
                  likes:userId
               }
            }
         )
         return response.status(200).json({
            message:'Comment liked successfully',
            success:true
         })
      }else{
         await Comment.updateOne(
            {
               _id:commentId
            },
            {
               $pull:{
                  likes:userId
               }
            }
         )
         return response.status(200).json({
            message:'Comment unliked successfully',
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
module.exports=likeComment