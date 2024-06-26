const Group=require('../../models/GroupModel')
async function editGroup(request,response){
   try{
      const user=request?.user
      if(!user){
         return response.status(403).json({
            message:'Unauthorized',
            error:true
         })
      }

      const { groupId, name, cover_pic, profile_pic, privacy }=request.body
      const group=await Group.findById(groupId)
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }

      if(group?.admin?.includes(user?._id)){
         await group.updateOne({
            name, cover_pic, profile_pic, privacy
         })
         await group.save()
         return response.status(200).json({
            data:group,
            message:'Group updated successfully',
            success:true
         })
      }else{
         return response.status(200).json({
            message:'Unauthorized',
            error:true
         })
      }
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=editGroup