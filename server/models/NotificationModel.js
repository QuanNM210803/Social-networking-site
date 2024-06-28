const mongoose=require('mongoose')

const notificationSchema=new mongoose.Schema({
   from:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   to:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   type:{
      type:String,
      required:true,
      enum:['comment','like','friend request','accept friendship', 'request join group','group member','post','post in group']
   },
   related:{
      type:mongoose.Schema.Types.Mixed,
      default:null
   },
   read:{
      type:Boolean,
      default:false
   }
},{
   timestamps:true
})

const NotificationModel=mongoose.model('Notification',notificationSchema)
module.exports=NotificationModel