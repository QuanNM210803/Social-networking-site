const getUserDetailsFromToken = require("../../helpers/getUserDetailsFromToken")
const UserModel = require("../../models/UserModel")

async function updateUserDetails(request,response){
   try{
      const user= request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const {name, profile_pic, cover_pic, phone, address, dob}=request.body
      const updateUser= await UserModel.updateOne(
         {
            _id:user._id
         },
         {name, profile_pic, cover_pic, phone, address, dob}
      )

      const userInfornation=await UserModel.findById(user._id).select('-password')
      return response.status(200).json({
         message:'User update successfully',
         data: userInfornation,
         success: true
      })
   }catch(error){
      return response.status(500).json({
         message: error.message || error,
         error: true
      })
   }
}


module.exports=updateUserDetails