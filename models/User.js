const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    name: { type: String },
    password: {
        type: String,
        // 不查询密码
        select: false,
        // 密码加密
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    describe: { type: String },
    role: { type: String }
}, { // 自动带时间 
    timestamps: true
})

module.exports = mongoose.model('User', schema)