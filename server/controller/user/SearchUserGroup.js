const User=require('../../models/UserModel')
const Group=require('../../models/GroupModel')
async function searchUserGroup(request, response){
   try{
      const {search}=request.body
      const query =new RegExp(search,'i','g')
      const user=await User.find({
         name:query
      }).select('_id name profile_pic')

      const groups=await Group.find({
         name:query
      }).select('_id name profile_pic')

      return response.status(200).json({
         message:'all user',
         dataUser: user,
         dataGroup: groups,
         success: true
      })
   }catch(error){
      return response.status(500).json({
         message: error.message|| error,
         error: true
      })
   }
}

module.exports=searchUserGroup