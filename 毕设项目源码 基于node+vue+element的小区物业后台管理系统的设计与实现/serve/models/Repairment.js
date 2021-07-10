 const mongoose = require("mongoose")
 const schema = new mongoose.Schema({
     address: String, // 地点
     name: String, // 姓名
     content: String, // 内容
     phone: Number, // 电话
     WeChat: Number, // 微信
     username: String, // 申请报修的用户名
     repairState: String, // 报修状态
     repairerName: String, // 
 }, {
     timestamps: {
         createdAt: 'createTime',
         updatedAt: 'updateTime'
     }
 })

 module.exports = mongoose.model('Repairment', schema)