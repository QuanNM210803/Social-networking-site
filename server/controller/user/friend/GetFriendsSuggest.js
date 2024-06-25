const formatDate = require('../../../helpers/FormatDate')
const User=require('../../../models/UserModel')

async function getFriendsSuggest(request,response){
   try{
      const userId=request?.user?._id
      const user=await User.findById(userId).select('friends')
      if(!user){
         return response.status(401).json({
            message:'Unauthorized: Invalid Token',
            error:true
         })
      }

      const friendsSuggest=await User.find({
         _id:{
            $ne:userId // not equal
         },
         friends:{
            $not:{
               // elemMatch kiểm tra xem có phần tử nào trong mảng thỏa mãn điều kiện user=userId không.
               $elemMatch:{
                  user:userId
               }
            }
         },
         friend_requests:{
            $not:{
               $elemMatch:{
                  user:userId
               }
            }
         }
      }).select('_id name profile_pic friends').limit(10)

      const payloadFriendsSuggestions=friendsSuggest.map((friend)=>{
         const commonFriends=user?.friends?.filter((f)=>friend?.friends?.some((f2)=>f2?.user?.toString()===f?.user?.toString())) || []
         const payloadCommonFriends=commonFriends.map((f)=>f?.user?._id.toString()) || []
         return {
            _id:friend?._id,
            name:friend?.name,
            profile_pic:friend?.profile_pic,
            mutualFriends:payloadCommonFriends
         }
      })
      console.log(payloadFriendsSuggestions)
      
      return response.status(200).json({
         data:payloadFriendsSuggestions,
         message:'Friend suggest',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message||error,
         error:true
      })
   }
}
module.exports=getFriendsSuggest