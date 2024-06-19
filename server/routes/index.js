const express=require('express')

const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const logout = require('../controller/logout')

const router=express.Router()

router.post('/email',checkEmail)
router.post('/password',checkPassword)
router.get('/logout',logout)

module.exports=router