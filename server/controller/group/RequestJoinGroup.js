const Group=require('../../models/GroupModel')
async function requestJoinGroup(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(401).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {groupId}=request?.body
      const group=await Group.findById(groupId).select('pending_members members')
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }
      if(group?.members?.includes(user?._id)){
         return response.status(400).json({
            message:'You are already a member of this group',
            error:true
         })
      }
      if(group?.pending_members?.includes(user?._id)){
         await group.updateOne({
            $pull:{
               pending_members:user?._id
            }
         })
         await group.save()
         return response.status(200).json({
            data:group,
            request:false,
            message:'Request cancelled',
            success:true
         })
      }else{
         await group.updateOne({
            $push:{
               pending_members:user?._id
            }
         })
         await group.save()
         return response.status(200).json({
            data:group,
            request:true,
            message:'Request sent',
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

module.exports=requestJoinGroup