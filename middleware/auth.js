// 用于token验证
module.exports = () => {
    // 引入jwt用于生成token
    const jwt = require('jsonwebtoken')
    // 用于http报错处理，错误时抛出状态码和信息
    const assert = require('http-assert')

    return async( req,res,next ) => {
        const token = await String( req.headers.authorization || '' ).split(' ').pop()
        assert(token,401,"请先登录哦！")

        const { id } = jwt.verify(token,req.app.get('secret'))
        assert(id,401,"用户不存在，请重新登录！")

        req.user = await require('../models/User').findById(id)
        assert(req.user,401,'用户不存在，请重新登录！')

        next()
    }
}