const formatDate = require('../../helpers/FormatDate')
const User=require('../../models/UserModel')
const Group=require('../../models/GroupModel')
const Post=require('../../models/PostModel')
async function getPostsByUserId(request,response){
   try{
      const self=request?.user
      if(!self){
         return response.status(404).json({
            message:'Unauthorized',
            error:true
         })
      }
      const userId=request?.query?.userId
      const user=await User.findById(userId)
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const page=parseInt(request?.query?.page)||1
      const limit=parseInt(request?.query?.limit) || 10
      const skip=(page-1)*limit
      const posts=await Post.find({poster:userId})
                        .sort({createdAt:-1})
                        .skip(skip)
                        .limit(limit)
                        .populate('poster','_id name profile_pic')
      const groups=await Group.find()
      const data=posts.filter(post=>{
         const groupContainingPost=groups.find(group=>group?.posts?.includes(post?._id))
         if(groupContainingPost){
            if(groupContainingPost?.privacy==='private'){
               if(groupContainingPost?.members?.includes(self?._id)){
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
      const totalPosts=await Post.countDocuments()
      return response.status(200).json({
         data:data,
         currentPage:page,
         totalPages:Math.ceil(totalPosts/limit),
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

module.exports=getPostsByUserId