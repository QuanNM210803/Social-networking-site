const User=require('../../../models/UserModel')
async function cancelFriendRequest(request, response){
   try{
      const {fromId, toId}=request?.body

      const sender=await User.findById(fromId)
      const receiver=await User.findById(toId)
      if(!sender || !receiver){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      if(receiver?.friend_requests.includes(fromId) && !sender?.friends.includes(toId)){
         await receiver?.updateOne({
            $pull:{
               friend_requests:fromId
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

module.exports=cancelFriendRequest