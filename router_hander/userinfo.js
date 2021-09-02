const db = require('../db/index')
const bcrypt = require('bcryptjs')
module.exports.getUserInfo = (req, res) => {
    const sql = 'select id, username,nickname, email, user_pic from ev_users  where id=?'
    db.query(sql, req.user.id, (err, rst) => {
        if (err) return res.cc(err)
        if (rst.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status: 0,
            msg: '获取用户成功',
            data: rst[0]
        })
    })
}
module.exports.updatUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, rst) => {
        if (err) return res.cc(err)
        if (rst.affectedRows !== 1) return res.cc('用户信息更新失败')
        res.cc('用户信息更新成功', 0)
    })
}
module.exports.updatePwd = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, rst) => {
        if (err) return res.cc(err)
        if (rst.length !== 1) return res.cc('用户不存在')
        const cmpRst = bcrypt.compareSync(req.body.oldPwd, rst[0].password)
        if (!cmpRst) return res.cc('旧密码错误')

        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, rst) => {
            if (err) return res.cc(err)
            if (rst.affectedRows !== 1) return res.cc('密码更改失败')
            res.cc('密码更改成功')
        })
    })
}
module.exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, rst) => {
        if (err) return res.cc(err)
        if (rst.affectedRows !== 1) return res.cc('头像上传失败')
        res.cc('头像上传成功')
    })
}