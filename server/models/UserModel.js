const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
   name:{
      type: String,
      required: [true, 'provide name']
   },
   email:{
      type: String,
      required: [true,'provide email'],
      unique: true
   },
   password:{
      type: String,
      required:[true, 'provide password']
   },
   profile_pic:{
      type:String,
      default:''
   },
   cover_pic:{
      type:String,
      default:''
   },
   phone:{
      type:String,
      default:''
   },
   address:{
      type:String,
      default:''
   },
   dob:{
      type:Date,
      default:null
   },
   friends:[
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
         createdAt: {
            type: Date,
            default: Date.now
         }
      }
   ],
   friend_requests:[
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
         createdAt: {
            type: Date,
            default: Date.now
         }
      }
   ],
   storagedVideo:[
      {
         type:String,
         default:[]
      }
   ]
},{
   timestamps: true
})

const UserModel=mongoose.model('User',userSchema)

module.exports=UserModel