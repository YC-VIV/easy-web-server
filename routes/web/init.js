/* 
    前端路由
*/
module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')

    let promise = require('../../plugins/db')


    promise.then((value) => {
        console.log('init测试服务'+value);
    }, (reason) => {
        console.log(reason);
    })

    app.use('/web/api', router)
}