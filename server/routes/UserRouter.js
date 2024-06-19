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

const userRouter=express.Router()

userRouter.get('/user-details', userDetails)
userRouter.post('/register',registerUser)
userRouter.put('/update-user',updateUserDetails)
userRouter.post('/search-user',searchUser)

userRouter.post('/friendRequest',friendRequest)
userRouter.put('/cancelFriendRequest',cancelFriendRequest)
userRouter.put('/acceptFriend',acceptFriend)
userRouter.put('/deleteFriendRequest',deleteFriendRequest)
userRouter.put('/unfriend',unfriend)

module.exports=userRouter