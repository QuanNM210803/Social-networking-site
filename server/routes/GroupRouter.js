const express=require('express')
const createGroup = require('../controller/group/CreateGroup')
const groupDetails = require('../controller/group/GroupDetails')
const createPostInGroup = require('../controller/group/CreatePostInGroup')
const getGroupByUserId = require('../controller/group/GetGroupByUserId')
const protectRouter = require('./ProtectRouter')
const getImagesByGroupId = require('../controller/group/GetImagesByGroupId')
const getVideosByGroupId = require('../controller/group/GetVideosByGroupId')

const groupRouter=express.Router()

groupRouter.post('/create',protectRouter,createGroup)
groupRouter.get('/groupDetails/:groupId',protectRouter,groupDetails)
groupRouter.post('/createPostInGroup',protectRouter,createPostInGroup)
groupRouter.get('/getGroupOfUser',protectRouter,getGroupByUserId)

groupRouter.get('/getImagesByGroupId',protectRouter,getImagesByGroupId)
groupRouter.get('/getVideosByGroupId',protectRouter,getVideosByGroupId)

module.exports=groupRouter