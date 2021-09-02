const express = require('express')
const router = express.Router()
const joi = require('@escook/express-joi')

const handle = require('../router_hander/userinfo')
router.get('/userinfo', handle.getUserInfo)

const { update_userinfo_schema } = require('../schema/user')
router.post('/userinfo', joi(update_userinfo_schema), handle.updatUserInfo)

const { update_pwd_schema } = require('../schema/user')
router.post('/updatepwd', joi(update_pwd_schema), handle.updatePwd)

const { update_avatar_schema } = require('../schema/user')
router.post('/update/avatar', joi(update_avatar_schema), handle.updateAvatar)
module.exports = router