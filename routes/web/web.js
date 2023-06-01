/* 
    前端路由
*/
const resource = require('../../middleware/resource')

module.exports = (app) => {
    const express = require('express')
    const router = express.Router(
        {
            // 由于子路由使用了路由的动态参数resource，所以这里需要设置合并路由
            mergeParams : true
        }
    )
    let promise = require('../../plugins/db')

    function doSomething() {
        router.get('/', async( req,res ) => {
            const items = await req.Model.find()
            res.send(items)
        } )
    }

    promise.then((value) => {
        console.log('Easy-Web' + value);
        doSomething();
    }, (reason) => {
        console.log(reason);
    })

    app.use('/web/api/rest/:resource', resource() , router)

    // app.use('/web/api', router)
}