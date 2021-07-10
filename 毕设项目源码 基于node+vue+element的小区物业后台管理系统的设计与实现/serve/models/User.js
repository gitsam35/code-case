const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    nickName: String,
    username: String,
    phone: Number,
    avatarUrl: String, // 微信头像地址
    password: {
        type: String,
        select: false,
        set: function(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})

module.exports = mongoose.model('User', schema)