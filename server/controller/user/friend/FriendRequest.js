const User=require('../../../models/UserModel')
async function friendRequest(request, response){
   try{
      const {fromId , toId}=request?.body

      const sender=await User.findById(fromId)
      const receiver=await User.findById(toId)
      if(!sender || !receiver){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }

      if(!sender?.friends.includes(toId) && !receiver?.friend_requests.includes(fromId)){
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
      }else if(sender?.friends.includes(toId)){
         return response.status(400).json({
            message:'Already friends',
            error:true
         })
      }else if(receiver?.friend_requests.includes(fromId)){
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