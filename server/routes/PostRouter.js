const express=require('express')
const createPost=require('../controller/post/CreatePost')
const getPostsByUserId = require('../controller/post/getPostsByUserId')
const deletePost = require('../controller/post/DeletePost')
const likePost = require('../controller/post/LikePost')
const getLikeByPostId = require('../controller/post/getLikeByPostId')
const postRouter=express.Router()

postRouter.post('/create',createPost)
postRouter.get('/all/user/:userId',getPostsByUserId)
postRouter.delete('/delete',deletePost)
postRouter.put('/like-post',likePost)
postRouter.get('/getLike',getLikeByPostId)

module.exports=postRouter