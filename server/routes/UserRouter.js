const express=require('express')
const registerUser = require('../controller/user/registerUser')
const userDetails = require('../controller/user/userDetails')
const updateUserDetails = require('../controller/user/updateUserDetails')
const searchUser = require('../controller/user/searchUser')
const friendRequest = require('../controller/user/friend/FriendRequest')
const cancelFriendRequest = require('../controller/user/friend/CancelFriendRequest')
const acceptFriend = require('../controller/user/friend/AcceptFriend')
const deleteFriendRequest = require('../controller/user/friend/DeleteFriendRequest')
const unfriend = require('../controller/user/friend/Unfriend')
const getFriendRequest = require('../controller/user/friend/GetFriendRequest')
const protectRouter = require('./ProtectRouter')

const userRouter=express.Router()

userRouter.get('/user-details',protectRouter, userDetails)
userRouter.post('/register',registerUser)
userRouter.put('/update-user',protectRouter,updateUserDetails)
userRouter.post('/search-user',protectRouter,searchUser)

userRouter.post('/friendRequest',protectRouter,friendRequest)
userRouter.put('/cancelFriendRequest',protectRouter,cancelFriendRequest)
userRouter.put('/acceptFriend',protectRouter,acceptFriend)
userRouter.put('/deleteFriendRequest',protectRouter,deleteFriendRequest)
userRouter.put('/unfriend',protectRouter,unfriend)

userRouter.get('/getFriendRequest',protectRouter,getFriendRequest)

module.exports=userRouter