const formatDate = require('../../helpers/FormatDate')
const Post=require('../../models/PostModel')
const Group=require('../../models/GroupModel')
async function getPostsPaginationInGroup(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const groupId=request?.query?.groupId
      const page=parseInt(request?.query?.page)||1
      const limit=parseInt(request?.query?.limit) || 5
      const skip=(page-1)*limit

      const group=await Group.findById(groupId)
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }

      if(group?.privacy==='public' || group?.members?.includes(user?._id)){
         const posts=await Post.find({
            _id:{
               $in:group?.posts
            }
         })
            .sort({createdAt:-1})
            .skip(skip)
            .limit(limit)
            .populate('poster','_id name profile_pic')
         const data=posts.map(post=>{
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
               group:null
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
      }else{
         return response.status(200).json({
            data:[],
            message:'Private group, join to see more details',
            success:true
         })
      }
      
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}
module.exports=getPostsPaginationInGroup