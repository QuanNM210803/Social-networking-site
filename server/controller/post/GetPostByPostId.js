const formatDate = require('../../helpers/FormatDate')
const Post=require('../../models/PostModel')
const Group=require('../../models/GroupModel')

async function getPostByPostId(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const postId=request?.params?.postId
      const posts=await Post.find({
         _id:postId
      }).populate('poster','_id name profile_pic')

      const groups=await Group.find()
      const data=posts.filter(post=>{
         const groupContainingPost=groups.find(group=>group?.posts?.includes(post?._id))
         if(groupContainingPost){
            if(groupContainingPost?.privacy==='private'){
               if(groupContainingPost?.members?.includes(user?._id)){
                  return true
               }else{
                  return false
               }
            }
            return true
         }
         return true
      })
      .map(post=>{
         const groupContainingPost = groups.find(group => group?.posts?.includes(post?._id))
         return {
            _id: post?._id,
            poster: {
               _id: post?.poster?._id,
               name: post?.poster?.name,
               profile_pic: post?.poster?.profile_pic
            },
            content: {
               text: post?.content?.text,
               image: post?.content?.image,
               video: post?.content?.video
            },
            like: post?.likes,
            comment: post?.comments?.length,
            createdAt: formatDate(post?.createdAt),
            group: groupContainingPost ? {
               _id: groupContainingPost._id,
               name: groupContainingPost.name
            } : null
         }
      })

      return response.status(200).json({
         data:data,
         message:'Get posts successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}
module.exports=getPostByPostId