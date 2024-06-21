const User=require('../../models/UserModel')
const jwt=require('jsonwebtoken')
async function userDetails(request, response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      return response.status(200).json({
         message:'User details',
         data: user,
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message: error.message || error,
         error: true
      })
   }
}

module.exports=userDetails