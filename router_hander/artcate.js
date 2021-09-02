const db = require('../db/index')
module.exports.getArtCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, rst) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            msg: '获取成功',
            data: rst
        })
    })
}

module.exports.addCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, rst) => {
        if (err) return res.cc(err)
        if (rst.length === 2) return res.cc('分类名和别名被占用，请重试！')
        if (rst.length === 1) {
            if (rst[0].name === req.body.name) return res.cc('分类名被占用，请重试！')
            if (rst[0].alias === req.body.alias) return res.cc('别名被占用，请重试！')
        }
        //添加到数据库
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, rst) => {
            if (err) return res.cc(err)
            if (rst.affectedRows !== 1) return res.cc('添加文章分类失败')
            res.cc('新增成功')
        })
    })
}

module.exports.deleteById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'; //标记删除
    db.query(sql, req.params.id, (err, rst) => {
        if (err) return res.cc(err)
        if (rst.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功', 1)
    })
}

module.exports.getArtCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, rst) => {
        if (err) return res.cc(err)
        if (rst.length !== 1) return res.cc('获取文章失败')
        res.send({
            status: 0,
            msg: '获取文章数据成功',
            data: rst
        })
    })
}

module.exports.updateCateById = (req, res) => {
    //更新，先排除当前id，再看其它有没有重名
    const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, rst) => {
        if (err) return res.cc(err)
        if (rst.length === 2) return res.cc('分类名和别名被占用，请重试！')
        if (rst.length === 1) {
            if (rst[0].name === req.body.name) return res.cc('分类名被占用，请重试！')
            if (rst[0].alias === req.body.alias) return res.cc('别名被占用，请重试！')
        }
        const sql = 'update ev_article_cate set ? where Id=?'
        db.query(sql, [req.body, req.body.Id], (err, rst) => {
            if (err) return res.cc(err)
            if (rst.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('ok')
        })

    })

}