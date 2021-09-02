const express = require('express')
const router = express.Router()

const handle = require('../router_hander/user')

const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user') //结构赋值

router.post('/reguser', expressJoi(reg_login_schema), handle.regUser)
router.post('/login', expressJoi(reg_login_schema), handle.loginUser)
module.exports = router