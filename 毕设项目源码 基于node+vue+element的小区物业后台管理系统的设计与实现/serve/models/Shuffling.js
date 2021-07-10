 const mongoose = require("mongoose")
 const schema = new mongoose.Schema({
     title: String, // 轮播图 标题
     picture: String, // 轮播图 地址
 }, {
     timestamps: {
         createdAt: 'createTime',
         updatedAt: 'updateTime'
     }
 })

 module.exports = mongoose.model('Shuffling', schema)