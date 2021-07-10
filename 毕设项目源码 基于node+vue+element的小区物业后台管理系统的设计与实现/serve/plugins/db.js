module.exports = app => {
    // 引入mongoose第三方模块 用来操作数据库
    const mongoose = require("mongoose")
        // 修复弹出警告:findOneAndUpdate()内部会使用findAndModify驱动，驱动即将被废弃
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
        // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('数据库连接成功'))
        .catch(() => console.log('数据库连接失败'))

    require('require-all')(__dirname + '/../models')
}