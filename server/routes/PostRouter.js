const express=require('express')
const createPost=require('../controller/post/CreatePost')
const getPostsByUserId = require('../controller/post/getPostsByUserId')
const deletePost = require('../controller/post/DeletePost')
const postRouter=express.Router()

postRouter.post('/create',createPost)
postRouter.get('/all/user/:userId',getPostsByUserId)
postRouter.delete('/delete',deletePost)

module.exports=postRouter