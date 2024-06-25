const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
const Group=require('../../models/GroupModel')
async function getImagesByGroupId(request,response){
   try{
      const self=request?.user
      if(!self){
         return response.status(400).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {groupId}=request?.query
      const group=await Group.findById(groupId)
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }
      if(group?.privacy==='public' || group?.members?.includes(self?._id.toString())){
         const posts=await Post.find({
            _id:{
               $in:group?.posts
            }
         }).select('content.image')
         let images=[]
         posts.forEach(post=>{
            images=[...images,...post?.content?.image]
         })
         return response.status(200).json({
            data:images,
            message:'Get images by group successfully',
            success:true
         })
      }else{
         return response.status(200).json({
            message:'Private group, join to see more details',
            success:true
         })
      }
      
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=getImagesByGroupId