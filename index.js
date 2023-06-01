// 导入express
const express = require('express')

const app = express()

// 设置token的密钥
app.set('secret','jid81jkd0da1411hf83fafa')

// 解决跨域
app.use(require('cors')())
// 解析表单中的JSON格式的数据
app.use(express.json({limit: '50mb'}))

// 将app传入admin中的admin.js
require('./routes/admin/admin')(app)
require('./routes/web/web')(app)
// require('./routes/web/init')(app)

// IP
const IP = 'localhost'
// 端口
const PORT = 3001 

// 启动端口服务
app.listen( PORT , () => {
    console.log(`http://${IP}:${PORT} 服务正在运行...`)
} )

module.exports = {
    IP,
    PORT
}
