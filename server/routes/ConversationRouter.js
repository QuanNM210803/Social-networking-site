const express=require('express')
const conversationById = require('../controller/conversation/conversationById')
const protectRouter = require('./ProtectRouter')

const conversationRouter=express.Router()
conversationRouter.get('/conversations/:userId',protectRouter,conversationById)

module.exports=conversationRouter