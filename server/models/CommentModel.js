const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
   commenter:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   content:{
      text: {
         type:String,
         default:''
      },
      image: {
         type:String,
         default:''
      },
      video: {
         type:String,
         default:''
      }
   },
   likes:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         default:[]
      }
   ]
},{
   timestamps:true
})

const CommentModel=mongoose.model('Comment',commentSchema)
module.exports=CommentModel