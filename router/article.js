const express = require('express')
const router = express.Router()

const handler = require('../router_hander/article')

const multer = require('multer') //上传Formdata数据，
const path = require('path')
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

const { addArticle_schema } = require('../schema/article')
const joi = require('@escook/express-joi')
    //single挂载中间件, file在req.file，文本在req.body中，joi只能不能验证file数据，需要在处理函数中手动判断
router.post('/add', uploads.single('cover_img'), joi(addArticle_schema), handler.adArticle) //先解析数据，再后端验证参数
module.exports = router