const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    props: { type: String },
    model: { type: String },
    resize: { type: String },
    key: { type: String },
    render: { type: String },
    preview: { type: String },
    label: { type: String },
}, { // 自动带时间 
    timestamps: true
})

module.exports = mongoose.model('Component', schema)