const Group=require('../../models/GroupModel')
async function outGroup(request,response){
   try{
      const user=request?.user
      if(!user){
         return response.status(401).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {groupId}=request?.body
      const group=await Group.findById(groupId).select('members admin')
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }

      if(group?.admin?.includes(user?._id)){
         return response.status(400).json({
            message:'Admin can not leave group',
            error:true
         })
      }
      if(!group?.members?.includes(user?._id)){
         return response.status(400).json({
            message:'You are not a member of this group',
            error:true
         })
      }
      
      await group.updateOne({
         $pull:{
            members:user?._id
         }
      })
      await group.save()
      return response.status(200).json({
         message:'You left group successfully',
         success:true
      })

   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=outGroup