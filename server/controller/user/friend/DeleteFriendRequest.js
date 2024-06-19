const User=require('../../../models/UserModel')
async function deleteFriendRequest(request, response){
   try{
      const {fromId , toId}=request?.body

      const self=await User.findById(fromId)
      const other=await User.findById(toId)
      if(!self || !other){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }

      if(self?.friend_requests.includes(toId) && !self?.friends.includes(toId)){
         await self?.updateOne({
            $pull:{
               friend_requests:toId
            }
         })
         return response.status(200).json({
            message:'Request deleted successfully',
            success:true
         })
      }
      throw new Error('Error')
   }catch(error){
      return response.status(500).json({
         message: error.message|| error,
         error: true
      })
   }
}

module.exports=deleteFriendRequest