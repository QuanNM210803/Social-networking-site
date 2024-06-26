const User=require('../../models/UserModel')
const Group=require('../../models/GroupModel')
const cloudinary=require('cloudinary').v2
async function createGroup(request,response){
   try{
      const user=request?.user
      if(!user){
         return response.status(404).json({
            message:'User not found',
            error:true
         })
      }
      const creatorId=user?._id.toString()
      const {name, privacy}=request?.body
      let {profile_pic, cover_pic}=request?.body

      if(!name || !privacy){
         return response.status(400).json({
            message:'Please provide all required fields',
            error:true
         })
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