const express = require('express');
const cors = require('cors')
require('dotenv').config()

const connectDB=require('./config/connectDB')
const userRouter=require('./routes/UserRouter')
const conversationRouter=require('./routes/ConversationRouter')
const messageRouter=require('./routes/MessageRouter')
const groupRouter=require('./routes/GroupRouter')
const postRouter=require('./routes/PostRouter')
const commentRouter=require('./routes/CommentRouter')
const router=require('./routes/index')
const cookiesParser=require('cookie-parser')
const {app, server}=require('./socket/index')


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

//api endpoint
app.use('/api',router)
app.use('/user',userRouter)
app.use('/conversation',conversationRouter)
app.use('/message',messageRouter)
app.use('/group',groupRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)

connectDB().then(()=>{
   server.listen(PORT,()=>{
      console.log('server running on port '+PORT)
   })
})

