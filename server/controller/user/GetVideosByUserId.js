const User=require('../../models/UserModel')
const Post=require('../../models/PostModel')
async function getVideosByUserId(request,response){
   try{
      const self=request?.user
      if(!self){
         return response.status(400).json({
            message:'Unauthorized',
            error:true
         })
      }
      const {userId}=request?.query
      const user=await User.findById(userId).select('-password')
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const posts=await Post.find(
         {
            poster:userId
         }
      ).select('content.video')
      let videos=[]
      posts.forEach(post=>{
         videos=[...videos,...post?.content?.video]
      })
      return response.status(200).json({
         data:videos,
         message:'Get images by user successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message|| error,
         error:true
      })
   }
}

module.exports=getVideosByUserId