const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.regUser = (req, res) => {
    const userinfo = req.body

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, rst) => { //异步
        if (err) { return res.cc(err) }
        if (rst.length > 0) { return res.cc('用户名被占用') }

        //调用bcrypt.hashSync()对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo);

        //插入新用户
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, rst) => {
            if (err) return res.cc(err)
            if (rst.affectedRows !== 1) return res.cc('注册失败，请重试')
            res.cc('注册成功', 0)
        })
    })

}
exports.loginUser = (req, res) => {

    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, rst) => {
        console.log(rst);
        if (err) return res.cc(err)
        if (rst.length !== 1) return res.cc('登录失败！')

        const cmpRst = bcrypt.compareSync(userinfo.password, rst[0].password)
        if (!cmpRst) return res.cc('密码错误')
            //生成JWT
        const user = {...rst[0], password: '', user_pic: '' } //剔除密码和头像
        const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({ status: 0, msg: '登录成功', token: `Bearer ${token}` })
    })

}