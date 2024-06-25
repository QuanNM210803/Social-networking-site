const formatDate = require('../../../helpers/FormatDate')
const User=require('../../../models/UserModel')

async function getFriendRequest(request,response){
   try{
      const userId=request?.user?._id
      const user=await User.findById(userId).select('friend_requests friends').populate({
         path:'friend_requests.user',
         select:'_id name profile_pic friends'
      })
      if(!user){
         return response.status(401).json({
            message:'Unauthorized: Invalid Token',
            error:true
         })
      }
      const friendRequests=[]
      user.friend_requests.sort((a,b)=>b?.createdAt-a?.createdAt)
      user.friend_requests.forEach((friendRequest)=>{
         const commonFriends=user?.friends.filter((friend)=>
            friendRequest?.user?.friends.some((f)=>f?.user?.toString()===friend?.user?.toString())) || []
         const payloadCommonFriends=commonFriends.map((f)=>f?.user?._id.toString())
         friendRequests.push({
            _id:friendRequest?.user?._id,
            name:friendRequest?.user?.name,
            profile_pic:friendRequest?.user?.profile_pic,
            mutualFriends:payloadCommonFriends,
            inviteTime:formatDate(friendRequest?.createdAt)
         })
      })
      
      return response.status(200).json({
         data:friendRequests,
         message:'Friend Requests',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}
module.exports=getFriendRequest