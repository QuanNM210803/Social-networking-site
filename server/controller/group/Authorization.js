// nếu không phải admin thì không được phép thực hiện
// nếu là admin thì kiểm tra người định cấp là ai
// nếu đó là mình thì không được phép làm gì cả
// nếu không phải mình thì ktra người đó đang có quyền gì
// nếu người đó là admin thì cho xuống members
// nếu người đó là member thì cho lên admin

const Group=require('../../models/GroupModel')
const User=require('../../models/UserModel')
async function authorization(request, response){
   try{
      const self=request?.user
      if(!self){
         return response.status(401).json({
            message:"Unauthorized",
            error:true
         })
      }

      const {groupId,userId}=request?.body
      const group=await Group.findById(groupId)
      if(!group){
         return response.status(404).json({
            message:"Group not found",
            error:true
         })
      }
      const user=await User.findById(userId)
      if(!user){
         return response.status(404).json({
            message:"User not found",
            error:true
         })
      }
      if(!group?.members?.includes(self?._id)){
         return response.status(401).json({
            message:"Unauthorized",
            error:true
         })
      }

      if(!group?.admin?.includes(self?._id)){
         return response.status(401).json({
            message:"Unauthorized",
            error:true
         })
      }
      if(self?._id===userId){
         return response.status(403).json({
            message:"You can't edit for yourself",
            error:true
         })
      }

      if(group?.admin?.includes(userId)){
         group?.admin?.pull(userId)
         await group.save()
         return response.status(200).json({
            message:`${user?.name} is no longer admin`,
            success:true,
            admin:false
         })
      }else if(group?.members?.includes(userId)){
         group?.admin?.push(userId)
         await group.save()
         return response.status(200).json({
            message:`${user?.name} is already admin`,
            success:true,
            admin:true
         })
      }else{
         return response.status(404).json({
            message:"User not in group",
            error:true
         })
      }
   }catch(error){
      return response.status(500).json({
         message:error?.message|| error,
         error:true
      })
   }
}

module.exports=authorization