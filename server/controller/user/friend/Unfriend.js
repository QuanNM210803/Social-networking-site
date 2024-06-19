const User=require('../../../models/UserModel')
async function unfriend(request, response){
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

      if(self?.friends.includes(toId) && other?.friends.includes(fromId)){
         await self?.updateOne({
            $pull:{
               friends:toId
            }
         })
         await other?.updateOne({
            $pull:{
               friends:fromId
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