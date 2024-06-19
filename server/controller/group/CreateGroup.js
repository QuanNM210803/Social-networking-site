const User=require('../../models/UserModel')
const Group=require('../../models/GroupModel')
const cloudinary=require('cloudinary').v2
async function createGroup(request,response){
   try{
      const {name, privacy, creatorId}=request?.body
      let {profile_pic, cover_pic}=request?.body

      const creator=await User.findById(creatorId)
      if(!creator){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      if(profile_pic){
         const uploadProfilePic=await cloudinary.uploader.upload(profile_pic)
         profile_pic=uploadProfilePic.secure_url
      }
      if(cover_pic){
         const uploadCoverPic=await cloudinary.uploader.upload(cover_pic)
         cover_pic=uploadCoverPic.secure_url
      }
      const newGroup=new Group({
         name,
         profile_pic,
         cover_pic,
         privacy,
         members:[],
         admin:[],
      })
      newGroup?.members.push(creatorId)
      newGroup?.admin.push(creatorId)
      await newGroup.save()
      return response.status(201).json({
         message:'Group created successfully',
         success:true
      })
   }catch(error){
      return response.status(500).json({
         message:error.message || error,
         error:true
      })
   }
}

module.exports=createGroup