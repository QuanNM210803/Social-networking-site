const User=require('../../models/UserModel')
async function getUserById(request,response){
   try{
      const self=request?.user
      const selfId=self?._id
      const userId=request?.params?.userId
      const user=await User.findById(userId).select('-password')
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const manualFriends=self?.friends.filter((friend)=>
         user?.friends.some((f)=>f?.user?.toString()===friend?.user?.toString()))
      const mutualFriends=manualFriends.map((friend)=>friend?.user?.toString())
      return response.status(200).json({
         data:{
            _id:user?._id,
            name:user?.name,
            email:user?.email,
            profile_pic:user?.profile_pic,
            cover_pic:user?.cover_pic,
            phone:user?.phone,
            address:user?.address,
            dob:user?.dob,
            friends:user?.friends,
            friend_requests:user?.friend_requests,
            storagedVideo:user?.storagedVideo,
            mutualFriends
         },
         message:'User',
         success:true
      
      })
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}

module.exports=getUserById