module.exports = () => {
    return async (req,res,next) => {
        // 使用中间件inflection将路由参数转换为单数
        // 这是为了命名规范，如categories对应模型Category
        const modelName = require('inflection').classify(req.params.resource)
        // 将模型挂载到请求对象上，以便后续能使用
        req.Model = require(`../models/${modelName}`)
        next()
    }
}