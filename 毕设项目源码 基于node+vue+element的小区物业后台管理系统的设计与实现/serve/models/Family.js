const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name1: String,
    name2: String,
    name3: String,
    name4: String,
    phone1: Number,
    phone2: Number,
    phone3: Number,
    phone4: Number,

}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})

module.exports = mongoose.model('Family', schema)