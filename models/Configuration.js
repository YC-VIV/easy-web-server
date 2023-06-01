const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    describe: { type: String },
    json: { type: String },
}, { // 自动带时间 
    timestamps: true
})

module.exports = mongoose.model('Configuration', schema)