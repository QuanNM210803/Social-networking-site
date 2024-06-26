const mongoose=require('mongoose')

const groupSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   profile_pic:{
      type:String,
      default:''
   },
   cover_pic:{
      type:String,
      default:''
   },
   privacy:{
      type:String,
      enum:['public','private'],
      default:'public'
   },
   members:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
      }
   ],
   pending_members:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         default:[]
      }
   ],
   admin:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
      }
   ],
   posts:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Post',
         default:[]
      }
   ]
},{
   timestamps:true
})

const GroupModel=mongoose.model('Group',groupSchema)
module.exports=GroupModel