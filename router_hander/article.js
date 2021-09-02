const db = require('../db/index')
const path = require('path')
module.exports.adArticle = (req, res) => {
    console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, rst) => {
        if (err) return res.cc(err)
        if (rst.affectedRows !== 1) return res.cc('文章发布失败')
        res.cc('文字发布成功')
    })
}