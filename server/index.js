const express = require('express');
const cors = require('cors')
require('dotenv').config()
const cloudinary=require('cloudinary').v2

const connectDB=require('./config/connectDB')
const userRouter=require('./routes/UserRouter')
const conversationRouter=require('./routes/ConversationRouter')
const messageRouter=require('./routes/MessageRouter')
const groupRouter=require('./routes/GroupRouter')
const postRouter=require('./routes/PostRouter')
const commentRouter=require('./routes/CommentRouter')
const router=require('./routes/index')
const cookiesParser=require('cookie-parser')
const {app, server}=require('./socket/index');
const createAPost = require('./controller/post/CreatePost');
const createAComment = require('./controller/comment/CreateComment');
const createAPostInGroup = require('./controller/group/CreatePostInGroup');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
})

//const app= express()
app.use(cors({
   origin: process.env.FRONTEND_URL,
   credentials:true
}))



app.use(express.json())
app.use(cookiesParser())

const PORT=process.env.PORT || 8080

app.get('/',(req,res)=>{
   res.json({
      message:'Server running on port '+PORT
   })
})

//cái này lấy qua hàm tổng hợp router
app.use('/api',router)
app.use('/user',userRouter)
app.use('/conversation',conversationRouter)
app.use('/message',messageRouter)
app.use('/group',groupRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)

// cái này lấy thẳng từ controller
app.use('/post',createAPost) 
app.use('/comment',createAComment)
app.use('/post',createAPostInGroup)

connectDB().then(()=>{
   server.listen(PORT,()=>{
      console.log('server running on port '+PORT)
   })
})

