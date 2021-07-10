 const mongoose = require("mongoose")
 const schema = new mongoose.Schema({
     title: String, // 公告标题
     time: Array, // 公告时间
     content: String, // 公告内容
 }, {
     timestamps: {
         createdAt: 'createTime',
         updatedAt: 'updateTime'
     }
 })

 module.exports = mongoose.model('Announcement', schema)