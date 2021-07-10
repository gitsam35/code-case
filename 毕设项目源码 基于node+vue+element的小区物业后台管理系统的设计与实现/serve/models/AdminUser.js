const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {

        type: String,
        select: false,
        set: function(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
}, {
    // mongoose新增的内置时间戳记录,createTime 和 updateTime 为自动记录时间的字段名，分别记录创建时间与更新时间，可以自定义。
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})

module.exports = mongoose.model('AdminUser', schema)