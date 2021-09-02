const { ref } = require('@hapi/joi')
const joi = require('@hapi/joi')
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required(); // 只能是这两个状态

module.exports.addArticle_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}