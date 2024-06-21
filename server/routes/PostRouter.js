const express=require('express')
const createPost=require('../controller/post/CreatePost')
const getPostsByUserId = require('../controller/post/getPostsByUserId')
const deletePost = require('../controller/post/DeletePost')
const likePost = require('../controller/post/LikePost')
const getLikeByPostId = require('../controller/post/getLikeByPostId')
const protectRouter = require('./ProtectRouter')
const postRouter=express.Router()

postRouter.post('/create',protectRouter,createPost)
postRouter.get('/all/user/:userId',protectRouter,getPostsByUserId)
postRouter.delete('/delete',protectRouter,deletePost)
postRouter.put('/like-post',protectRouter,likePost)
postRouter.get('/getLike',protectRouter,getLikeByPostId)

module.exports=postRouter