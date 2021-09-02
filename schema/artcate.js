const { ref } = require('@hapi/joi')
const joi = require('@hapi/joi')
const name = joi.string().min(1).max(10).required()
const alias = joi.string().alphanum().min(1).max(10).required()
const id = joi.number().integer().min(1).required()

module.exports.addcates_schema = {
    body: {
        name,
        alias
    }
}

module.exports.deletecates_schema = {
    params: { //动态参数:id
        id
    }
}

module.exports.getcates_schema = {
    params: { //动态参数:id
        id
    }
}

module.exports.updatecates_schema = {
    body: { //动态参数:id
        Id: id,
        name,
        alias
    }
}