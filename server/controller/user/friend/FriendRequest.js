const User=require('../../../models/UserModel')
async function friendRequest(request, response){
   try{
      const user=request?.user
      const { toId }=request?.body
      
      const sender=user
      const receiver=await User.findById(toId)
      if(!sender || !receiver){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const fromId=user?._id.toString()
      if(fromId===toId){
         return response.status(400).json({
            message:'Cannot send request to self',
            error:true
         })
      }

      if(!sender?.friends.some(friend=>friend?.user.toString()===toId) 
         && !receiver?.friend_requests.some(friendRequest=>friendRequest?.user.toString()===fromId)){
         await receiver?.updateOne({
            $push:{
               friend_requests:{
                  user:fromId,
                  createdAt: Date.now()
               }
            }
         })
         return response.status(200).json({
            message:'Request sent successfully',
            success:true
         })
      }else if(sender?.friends.some(friend=>friend?.user.toString()===toId) ){
         return response.status(400).json({
            message:'Already friends',
            error:true
         })
      }else if(receiver?.friend_requests.some(friendRequest=>friendRequest?.user.toString()===fromId)){
         return response.status(400).json({
            message:'Request already sent',
            error:true
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

module.exports=friendRequest