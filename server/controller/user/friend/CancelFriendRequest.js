const User=require('../../../models/UserModel')
async function CancelFriendRequest(request, response){
   try{
      const user=request?.user
      const {toId}=request?.body

      const sender=user
      const receiver=await User.findById(toId)
      if(!sender || !receiver){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const fromId=user?._id.toString()

      if(receiver?.friend_requests.some(friendRequest=>friendRequest?.user.toString()===fromId) 
         && !sender?.friends.some(friend=>friend?.user.toString()===toId) ){
         await receiver?.updateOne({
            $pull:{
               friend_requests:{
                  user:fromId
               }
            }
         })
         return response.status(200).json({
            message:'Request cancelled',
            success:true
         })
      }
      throw new Error('Error')
      
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=CancelFriendRequest