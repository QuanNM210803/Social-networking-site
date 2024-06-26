const User=require('../../../models/UserModel')
async function acceptFriend(request, response){
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

      if(self?.friend_requests.some(friendRequest=>friendRequest?.user?.toString()===toId?.toString()) 
         && !self?.friends.some(friend=>friend?.user?.toString()===toId?.toString())){
         console.log('1')
         await self?.updateOne({
            $pull:{
               friend_requests:{
                  user:toId
               }
            },
            $push:{
               friends:{
                  user:toId,
                  createdAt:Date.now()
               }
            }
         })
         await other?.updateOne({
            $push:{
               friends:{
                  user:fromId,
                  createdAt:Date.now()
               }
            }
         })
         return response.status(200).json({
            message:'Request accepted successfully',
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

module.exports=acceptFriend