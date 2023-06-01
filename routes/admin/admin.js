// 后台管理路由
const e = require('express')
const auth = require('../../middleware/auth')
const resource = require('../../middleware/resource')
// const Hero = require('../../models/Hero')
// const multiparty = require('multiparty')
// const { exists } = require('../../models/User')
// const path = require('path')
// const fs = require('fs')

// 将整个js文件作为函数暴露出去，形参为app，目的是获取express实例
module.exports = app => {
    // 导入express调用router并实例化
    const express = require('express')
    // 引入jwt用于生成token
    const jwt = require('jsonwebtoken')
    // 验证已经使用bcrypt加密的密码
    const bcrypt = require('bcrypt')
    // 用于http报错处理，错误时抛出状态码和信息
    const assert = require('http-assert')
    console.log(assert)

    const router = express.Router({
        // 由于子路由使用了路由的动态参数resource，所以这里需要设置合并路由
        mergeParams: true
    })

    // 引入分类的数据库模型对象
    let promise = require('../../plugins/db')

    // 操作数据库
    function doSomething() {
        // 需要操作数据库的接口
        // 新建
        router.post('/', async (req, res) => {
            const info = await req.Model.create(req.body)
            res.send(info)
        })
        // 查询
        router.get('/', async (req, res) => {
            const items = await req.Model.find()
            res.send(items)
        })
        // 根据id查看详情
        router.get('/:id', async (req, res) => {
            const info = await req.Model.findById(req.params.id)
            res.send(info)
        })
        // 修改
        router.put('/:id', async (req, res) => {
            const info = await req.Model.findByIdAndUpdate(req.params.id, req.body)
            res.send(info)
        })
        // 删除
        router.delete('/:id', async (req, res) => {
            const info = await req.Model.findByIdAndDelete(req.params.id)
            res.send({
                'seccess': true
            })
        })


    }

    // 用于数据库的连接操作是异步执行的，所以这里使用了promise进行操作
    promise.then((value) => {
        console.log('后台管理系统' + value)
        doSomething()
    }, (reason) => {
        console.log(reason)
    })

    app.use('/admin/api/rest/:resource', auth(), resource(), router)
    // app.use('/admin/api/rest/:resource', resource() , router)

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        try {
            const {
                name,
                password
            } = req.body
            // 根据用户名查询是否存在用户
            const User = require('../../models/User')
            const info = await User.findOne({
                name
            }, {
                name: 1,
                password: 1,
                role: 1
            })

            assert(info, 422, "找不到用户！")

            const right = bcrypt.compareSync(password, info.password)

            assert(right, 422, "密码错误！")

            // 生成token并返回
            const token = jwt.sign({
                id: info._id
            }, app.get('secret'))
            const role = info.role
            const uname = info.name
            res.send({
                token,
                role,
                uname,
                message: '登录成功！'
            })
        } catch (err) {
            res.status(err.status || 500).send({
                message: err.message
            })
            console.log('1333333', err)
        }
    })

}