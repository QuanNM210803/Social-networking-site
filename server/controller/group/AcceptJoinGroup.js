const User=require('../../models/UserModel')
const Group=require('../../models/GroupModel')
async function acceptJoinGroup(request, response){
   try{
      const self=request?.user
      if(!self){
         return response.status(401).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {groupId,userId}=request?.body
      const user=await User.findById(userId)
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const group=await Group.findById(groupId).select('members admin pending_members')
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }

      if(!group?.pending_members?.includes(userId)){
         return response.status(400).json({
            message:'User not in pending list',
            error:true
         })
      }

      if(!group?.admin?.includes(self?._id)){
         return response.status(400).json({
            message:'You are not an admin of this group',
            error:true
         })
      }
      
      await group.updateOne({
         $pull:{
            pending_members:userId
         },
         $push:{
            members:userId
         }
      })
      await group.save()
      return response.status(200).json({
         message:'User accepted successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=acceptJoinGroup