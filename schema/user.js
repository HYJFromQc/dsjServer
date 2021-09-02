const { ref } = require('@hapi/joi')
const joi = require('@hapi/joi')
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
    //用户信息
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
const markName = joi.string().required()
const avatar = joi.string().dataUri().required()

module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

module.exports.update_userinfo_schema = {
    body: {
        id,
        email,
        nickname: markName
    }
}
module.exports.update_pwd_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(ref('oldPwd')).concat(password) //不能和旧密码一致，但验证规则相同
    }
}

module.exports.update_avatar_schema = {
    body: {
        avatar
    }
}