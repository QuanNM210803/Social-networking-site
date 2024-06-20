const Group=require('../../models/GroupModel')
async function getGroupByUserId(request,response){
   try{
      const userId=request?.user._id
      if(!userId){
         return response.status(401).json({
            message:'Unauthorized: Invalid Token',
            error:true
         })
      }
      const groups=await Group.find(
         {
            members:userId
         }
      ).select('name profile_pic')
      return response.status(200).json({
         data:groups,
         message:'Groups fetched successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}
module.exports=getGroupByUserId