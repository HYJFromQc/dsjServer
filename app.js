const express = require('express')
const app = express()
const Joi = require('@hapi/joi')

//导入cors
const cors = require('cors')
app.use(cors())

//解析数据为 application/x-www.form-urlencoded
app.use(express.urlencoded({ extended: false }))

//托管静态资源
app.use('/uploads', express.static('./uploads'))

//使用错误回调处理中间件
app.use((req, res, next) => {
    res.cc = function(err, status = 1) { //默认处理失败
        res.send({ status, msg: err instanceof Error ? err.message : err })
    }
    next()
})

const expressJwt = require('express-jwt')
const config = require('./config')
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//----------导入路由---------------
app.use('/api', require('./router/user')) //用户模块
app.use('/my', require('./router/userinfo')) //用户信息模块
app.use('/my/article', require('./router/artcate')) //获取文章分类列表
app.use('/my/article', require('./router/article'))
    //-----------路由------------------

//全局错误处理
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) { //Joi参数校验失败
        return res.cc(err)
    }
    res.cc(err) // 4.2 未知错误
})

app.listen(3007, () => {
    console.log('api running at http://127.0.0.1:3007');
})

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJyaHoiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjpudWxsLCJlbWFpbCI6bnVsbCwidXNlcl9waWMiOiIiLCJpYXQiOjE2MzA0NzgwNjcsImV4cCI6MTYzMDUxNDA2N30.dUNlErlYged8J1qLvWhVz64IP5bWcgK0HhP5hyPPTnI