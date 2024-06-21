const User=require('../../../models/UserModel')
async function deleteFriendRequest(request, response){
   try{
      const user=request?.user
      const { toId}=request?.body

      const self=user
      const other=await User.findById(toId)
      if(!self || !other){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const fromId=user?._id.toString()

      if(self?.friend_requests.some(friendRequest=>friendRequest?.user.toString()===toId) 
         && !self?.friends.some(friend=>friend?.user.toString()===toId) ){
         await self?.updateOne({
            $pull:{
               friend_requests:{
                  user:toId
               }
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