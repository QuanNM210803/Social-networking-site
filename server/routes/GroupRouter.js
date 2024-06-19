const express=require('express')
const createGroup = require('../controller/group/CreateGroup')
const groupDetails = require('../controller/group/GroupDetails')
const createPostInGroup = require('../controller/group/CreatePostInGroup')

const groupRouter=express.Router()

groupRouter.post('/create',createGroup)
groupRouter.get('/groupDetails/:groupId',groupDetails)
groupRouter.post('/createPostInGroup',createPostInGroup)
module.exports=groupRouter