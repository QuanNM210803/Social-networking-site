const express=require('express')
const {Server} = require('socket.io')
const http=require('http')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const UserModel = require('../models/UserModel')
const ConversationModel =require('../models/ConversationModel')
const MessageModel =require('../models/MessageModel')
const NotificationModel=require('../models/NotificationModel')
const GroupModel=require('../models/GroupModel')
const PostModel=require('../models/PostModel')
const getConversation=require('../helpers/getConversation')
const { read } = require('fs')

const app=express()

/** socket connection */
const server= http.createServer(app)
const io=new Server(server,{
   cors:{
      origin: process.env.FRONTEND_URL,
      credentials: true
   }
})

const onlineUsers= new Set()

/** đăng kí 1 sự kiện 'connection', khi client kết nối hàm callback sẽ được gọi
 * với socket của client đó
 */
io.on('connection', async (socket)=>{
   console.log('connect user', socket.id)

   const token=socket.handshake.auth.token
   const user= await getUserDetailsFromToken(token)

   //create a room
   socket.join(user?._id?.toString())// thêm mỗi socket vào 1 phòng có tên user?._id
   onlineUsers.add(user?._id?.toString())

   /** Gửi danh sách người dùng đang online đến tất cả các client. */
   io.emit('onlineUsers', Array.from(onlineUsers))

   // socket.on('call-user', ({ from, to }) => {
   //    const targetSocketId = to
   //    console.log(from, to)
   //    if (targetSocketId) {
   //      io.to(targetSocketId).emit('incoming-call', { from });
   //    }
   //  });
  
   //  socket.on('accept-call', ({ from, to }) => {
   //    const fromSocketId = to
   //    if (fromSocketId) {
   //      io.to(fromSocketId).emit('call-accepted', { from, to });
   //    }
   //  });
  
   //  socket.on('offer', (data) => {
   //    const targetSocketId = data.to
   //    if (targetSocketId) {
   //      io.to(targetSocketId).emit('offer', data);
   //    }
   //  });
  
   //  socket.on('answer', (data) => {
   //    const targetSocketId = data.to
   //    if (targetSocketId) {
   //      io.to(targetSocketId).emit('answer', data);
   //    }
   //  });
  
   //  socket.on('candidate', (data) => {
   //    const targetSocketId = data.to
   //    if (targetSocketId) {
   //      io.to(targetSocketId).emit('candidate', data);
   //    }
   //  });

   /** đăng kí sự kiện */
   socket.on('message-page',async (userId)=>{
      const userDetails=await UserModel.findById(userId).select('-password')
      const payload={
         _id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         profile_pic: userDetails.profile_pic,
         online: onlineUsers.has(userId)
      }

      socket.emit('message-user',payload)

      //previous message
      const getConversationMessage=await ConversationModel.findOne({
         '$or':[
            {
               sender: user?._id, receiver: userId
            },
            {
               sender: userId, receiver: user?._id
            }
         ]
      }).populate('messages').sort({updatedAt: -1})
      socket.emit('message',getConversationMessage?.messages || [])
   })



   // new message
   socket.on('new-message',async (data)=>{
      if(data?.imageUrl || data?.videoUrl){
         const media={url: data?.imageUrl || data?.videoUrl}
         socket.emit('newMedia', media)
      }
      
      let conversation =await ConversationModel.findOne({
         '$or':[
            {
               sender: data?.sender, receiver: data?.receiver
            },
            {
               sender: data?.receiver, receiver: data?.sender
            }
         ]
      })

      if(!conversation){
         const createConversation=await ConversationModel({
            sender: data?.sender,
            receiver: data?.receiver
         })
         conversation=await createConversation.save()
      }

      const message= new MessageModel({
         text: data?.text,
         imageUrl: data?.imageUrl,
         videoUrl: data?.videoUrl,
         msgByUserId: data?.msgByUserId,
         seen: false
      })
      const saveMessage=await message.save()

      const updateConversation=await ConversationModel.updateOne(
         {
            _id: conversation?._id
         },
         {
            '$push':{ messages: saveMessage?._id }
         }
      )

      const getConversationMessage=await ConversationModel.findOne({
         '$or':[
            {
               sender: data?.sender, receiver: data?.receiver
            },
            {
               sender: data?.receiver, receiver: data?.sender
            }
         ]
      }).populate('messages').sort({updatedAt: -1})

      io.to(data?.sender).emit('message', getConversationMessage?.messages || [])
      io.to(data?.receiver).emit('message', getConversationMessage?.messages || [])

      //send conversation
      const conversationSender=await getConversation(data?.sender)
      const conversationReceiver=await getConversation(data?.receiver)

      io.to(data?.sender).emit('conversation', conversationSender)
      io.to(data?.receiver).emit('conversation', conversationReceiver)
      
   })

   //sidebar
   socket.on('sidebar', async (currentUserId)=>{
      const conversation=await getConversation(currentUserId)
      socket.emit('conversation', conversation)
   })

   //seen
   socket.on('seen',async (msgByUserId)=>{
      let conversation =await ConversationModel.findOne({
         '$or':[
            {
               sender: user?._id, receiver: msgByUserId
            },
            {
               sender: msgByUserId, receiver: user?._id
            }
         ]
      })

      const conversationMessageId= conversation?.messages || []
      const updateMessage=await MessageModel.updateMany({
         _id: {
            '$in': conversationMessageId
         },
         msgByUserId: msgByUserId
      },{
         '$set':{
            seen:true
         }
      })

      //send conversation
      const conversationSender=await getConversation(user?._id?.toString())
      const conversationReceiver=await getConversation(msgByUserId)

      io.to(user?._id.toString()).emit('conversation', conversationSender)
      io.to(msgByUserId).emit('conversation', conversationReceiver) // gửi đến tất cả các socket trong phòng có tên msgByUserId
   })

   //media
   socket.on('rightbar', async (senderId, receiverId)=>{
      const conversation=await ConversationModel.findOne({
         '$or':[
            {sender: senderId, receiver:receiverId},
            {sender: receiverId, receiver:senderId},
         ]
      }).populate('messages')
      const mediaConversation=conversation?.messages.reverse().filter(msg=> msg.imageUrl || msg.videoUrl) || []
      const media=[]
      if(mediaConversation.length>0){
         mediaConversation.forEach(msg=>{
            media.push({
               url:msg.imageUrl || msg.videoUrl
            })
         })
      }
      socket.emit('media',media || [])
   })

   //get-notification
   socket.on('get-notification', async(userId)=>{
      const notifications=await NotificationModel.find({
         to:userId
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      socket.emit('notifications', notifications) //nếu bạn đang xử lý một sự kiện từ một socket cụ thể và bạn muốn trả lời chỉ socket đó
   })

   //friend-request
   socket.on('friend-request', async (data)=>{
      const notification=new NotificationModel({
         from:data?.senderId,
         to:data?.receiverId,
         type:'friend request',
         related:{
            _id: data?.senderId
         },
         read:false
      })
      await notification.save()
      const notifications=await NotificationModel.find({
         to:data?.receiverId
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      io.to(data?.receiverId).emit('notifications',notifications)
   })

   //accept-friendship
   socket.on('accept-friendship', async (data)=>{
      const notification=new NotificationModel({
         from:data?.senderId,
         to:data?.receiverId,
         type:'accept friendship',
         related:{
            _id: data?.senderId
         },
         read:false
      })
      await notification.save()
      const notifications=await NotificationModel.find({
         to:data?.receiverId
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      io.to(data?.receiverId).emit('notifications',notifications)
   })

   //request-join-group
   socket.on('request-join-group', async (data)=>{
      const groupId=data?.groupId
      const requestId=data?.request
      const group=await GroupModel.findById(groupId).populate({
         path:'admin',
         select:'_id name profile_pic'
      })
      group?.admin?.forEach(async admin=>{
         const notification=new NotificationModel({
            from:requestId,
            to:admin?._id,
            type:'request join group',
            related:{
               _id: groupId,
               name: group?.name
            },
            read:false
         })
         await notification.save()
         const notifications=await NotificationModel.find({
            to:admin?._id
         }).populate({
            path:'from',
            select:'_id name profile_pic'
         }).sort({createdAt:-1})
         io.to(admin?._id.toString()).emit('notifications',notifications)
      })
   })

   //accept-join-group
   socket.on('accept-join-group', async (data)=>{
      const senderId=data?.senderId
      const receiverId=data?.receiverId
      const groupId=data?.groupId
      const group=await GroupModel.findById(groupId)
      const notification=new NotificationModel({
         from:senderId,
         to:receiverId,
         type:'group member',
         related:{
            _id: groupId,
            name: group?.name,
            profile_pic: group?.profile_pic
         },
         read:false
      })
      await notification.save()
      const notifications=await NotificationModel.find({
         to:receiverId
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      io.to(receiverId).emit('notifications',notifications)
   })

   //like
   socket.on('like', async(data)=>{
      const senderId=data?.senderId
      const postId=data?.postId
      const post=await PostModel.findById(postId)
      const notification=new NotificationModel({
         from:senderId,
         to:post?.poster,
         type:'like',
         related:{
            _id: postId
         },
         read:false
      })
      await notification.save()
      const notifications=await NotificationModel.find({
         to:post?.poster
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      console.log('poster',post?.poster)
      io.to(post?.poster.toString()).emit('notifications',notifications)
   })

   //comment
   socket.on('comment',async (data)=>{
      const senderId=data?.senderId
      const postId=data?.postId
      const post=await PostModel.findById(postId)
      const notification=new NotificationModel({
         from:senderId,
         to:post?.poster,
         type:'comment',
         related:{
            _id: postId
         },
         read:false
      })
      await notification.save()
      const notifications=await NotificationModel.find({
         to:post?.poster
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      io.to(post?.poster.toString()).emit('notifications',notifications)
   })

   //seen-notification
   socket.on('seen-notification',async (data)=>{
      const userId=data?.userId
      const updataNotification=await NotificationModel.updateMany({
         to:userId
      },{
         '$set':{
            read:true
         }
      })
      const notifications=await NotificationModel.find({
         to:userId
      }).populate({
         path:'from',
         select:'_id name profile_pic'
      }).sort({createdAt:-1})
      io.to(userId).emit('notifications',notifications)
   })
   socket.on('disconnect',()=>{
      onlineUsers.delete(user?._id?.toString())
      io.emit('onlineUsers', Array.from(onlineUsers))
      console.log('disconnect user', socket.id)
   })
})

module.exports={app, server}