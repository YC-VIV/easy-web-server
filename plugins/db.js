// 数据库存放位置
const mongoose = require('mongoose')

// 引入所有数据库模型，避免因调用关联的数据库报错
require('require-all')(__dirname + '/../models')

mongoose.connect('mongodb://127.0.0.1:27017/easy-web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var promise = new Promise((resolve,reject)=>{
    mongoose.connection.on('open',(err)=>{
        if(!err) {
            resolve('数据库连接成功！');
        } else {
            reject('数据库连接失败！');
        }
    })
})

module.exports = promise