const User=require('../../../models/UserModel')
async function unfriend(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const fromId=user?._id.toString()
      const {toId}=request?.body

      const self=user
      const other=await User.findById(toId)
      if(!other){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      console.log(fromId, toId)
      if(self?.friends.some(friend=>friend?.user.toString()===toId) 
         && other?.friends.some(friend=>friend?.user.toString()===fromId)){
         await self?.updateOne({
            $pull:{
               friends:{
                  user:toId
               }
            }
         })
         await other?.updateOne({
            $pull:{
               friends:{
                  user:fromId
               }
            }
         })
         return response.status(200).json({
            message:'Unfriend successfully',
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

module.exports=unfriend