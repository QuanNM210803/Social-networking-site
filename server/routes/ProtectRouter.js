const jwt=require('jsonwebtoken')
const User=require('../models/UserModel')
async function protectRouter(request,response, next){
   try{
      const token=request?.cookies?.token || ''
      if(!token){
         return response.status(401).json({
            message: 'Unauthorized: No token Provided',
            error:true
         })
      }
      const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
      if(!decoded){
         return response.status(401).json({
            message: 'Unauthorized: Invalid Token',
            error:true
         })
      }
      const user=await User.findById(decoded.id).select('-password')
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      request.user=user
      next()
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=protectRouter