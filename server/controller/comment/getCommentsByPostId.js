const formatDate = require('../../helpers/FormatDate')
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
      comments.sort((a,b)=>b.createdAt-a.createdAt)
      const payloadComments=comments.map(comment=>{
         return {
            _id:comment?._id,
            commenter:{
               _id:comment?.commenter?._id,
               name:comment?.commenter?.name,
               profile_pic:comment?.commenter?.profile_pic
            },
            content:{
               text:comment?.content?.text,
               image:comment?.content?.image,
               video:comment?.content?.video
            },
            like:comment?.likes,
            createdAt:formatDate(comment?.createdAt)
         }
      })
      return response.status(200).json({
         data: payloadComments,
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