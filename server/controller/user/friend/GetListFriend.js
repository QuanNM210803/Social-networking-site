const formatDate=require('../../../helpers/FormatDate')
const User=require('../../../models/UserModel')

async function getListFriend(request,response){
   try{
      const self=request?.user
      if(!self){
         return response.status(401).json({
            message:'Unauthorized: Invalid Token',
            error:true
         })
      }

      const {objectId}=request?.query
      const {search}=request?.query
      const user=await User.findById(objectId).select('friend_requests friends').populate({
         path:'friends.user',
         select:'_id name profile_pic friends'
      })
      if(!user){
         return response.status(401).json({
            message:'Unauthorized: Invalid Token',
            error:true
         })
      }
      const filteredFriends = user?.friends.filter(friend => 
         friend?.user && friend?.user?.name.toLowerCase().includes(search?.toLowerCase())
      )

      filteredFriends.sort((a,b)=>b?.createdAt-a?.createdAt)
      const listFriendsSelf=self?.friends.map((f)=>f?.user?._id.toString())

      const friends=[]
      filteredFriends.forEach((friend)=>{
         const listFriendsOther=friend?.user?.friends.map((f)=>f?.user?._id.toString())
         const commonFriends=listFriendsSelf.filter((f)=>listFriendsOther.includes(f)) || []
         friends.push({
            _id:friend?.user?._id,
            name:friend?.user?.name,
            profile_pic:friend?.user?.profile_pic,
            mutualFriends:commonFriends,
            createdAt:formatDate(friend?.createdAt)
         })
      })
      return response.status(200).json({
         data:friends,
         message:'Friends',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}
module.exports=getListFriend