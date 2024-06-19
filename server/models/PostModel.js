const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
   poster:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   content:{
      text: {
         type:String,
         default:''
      },
      image: [
         {
            type:String,
            default:''
         }
      ],
      video: [
         {
            type:String,
            default:''
         }
      ]
   },
   likes:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         default:[]
      }
   ],
   comments:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Comment',
         default:[]
      }
   ]
},{
   timestamps:true
})

const PostModel=mongoose.model('Post',postSchema)
module.exports=PostModel