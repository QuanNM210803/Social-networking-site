const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
async function getPostsByUserId(request,response){
   try{
      const userId=request?.params?.userId
      const user=await User.findById(userId)
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const posts=await Post.find({poster:userId}).sort({createdAt:-1})
      return response.status(200).json({
         data:posts,
         message:'Posts fetched successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=getPostsByUserId