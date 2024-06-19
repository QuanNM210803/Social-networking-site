const express=require('express')
const conversationById = require('../controller/conversation/conversationById')

const conversationRouter=express.Router()
conversationRouter.get('/conversations/:userId',conversationById)

module.exports=conversationRouter