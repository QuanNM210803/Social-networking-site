const Group=require('../../models/GroupModel')
async function groupDetails(request,response){
   try{
      const user=request?.user
      if(!user){
         return response.status(401).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {groupId}=request?.params
      const group=await Group.findById(groupId).populate('posts').populate({
         path:'admin',
         select:'_id name profile_pic'
      }).populate({
         path:'members',
         select:'_id name profile_pic'
      })
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }

      if(group?.privacy==='public' || group?.members?.some(member=>member?._id.toString()===user?._id.toString())){
         return response.status(200).json({
            data:group,
            message:'Group details',
            success:true
         })
      }else{
         return response.status(200).json({
            data:{
               _id:group?._id,
               name:group?.name,
               profile_pic:group?.profile_pic,
               cover_pic:group?.cover_pic
            },
            message:'Private group, join to see more details',
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
module.exports=groupDetails