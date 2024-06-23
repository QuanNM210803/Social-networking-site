const express=require('express')
const createComment = require('../controller/comment/CreateComment')
const getCommentsByPostId = require('../controller/comment/getCommentsByPostId')
const likeComment = require('../controller/comment/LikeComment')
const getLikeByCommentId = require('../controller/comment/getLikeByCommentId')
const protectRouter = require('./ProtectRouter')

const commentRouter=express.Router()

// commentRouter.post('/create-comment',protectRouter,createComment)

commentRouter.get('/getCommentsByPostId/:postId',protectRouter,getCommentsByPostId)
commentRouter.put('/like-comment',protectRouter,likeComment)
commentRouter.get('/getLike',protectRouter,getLikeByCommentId)

module.exports=commentRouter