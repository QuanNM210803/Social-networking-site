const express=require('express')
const createComment = require('../controller/comment/CreateComment')
const getCommentsByPostId = require('../controller/comment/getCommentsByPostId')
const likeComment = require('../controller/comment/LikeComment')
const getLikeByCommentId = require('../controller/comment/getLikeByCommentId')

const commentRouter=express.Router()

commentRouter.post('/create-comment',createComment)
commentRouter.get('/getCommentsByPostId/:postId',getCommentsByPostId)
commentRouter.put('/like-comment',likeComment)
commentRouter.get('/getLike',getLikeByCommentId)

module.exports=commentRouter