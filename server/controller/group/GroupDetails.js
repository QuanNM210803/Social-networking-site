const Group=require('../../models/GroupModel')
async function groupDetails(request,response){
   try{
      const {groupId}=request?.params
      const group=await Group.findById(groupId).populate('posts').populate({
         path:'admin',
         select:'_id name profile_pic'
      })
      if(!group){
         return response.status(404).json({
            message:'Group not found',
            error:true
         })
      }
      return response.status(200).json({
         data:group,
         message:'Group details',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}
module.exports=groupDetails