 const mongoose = require("mongoose")
 const schema = new mongoose.Schema({
     repairerName: String, // 姓名
     repairerPhone: Number, // 电话
 }, {
     timestamps: {
         createdAt: 'createTime',
         updatedAt: 'updateTime'
     }
 })

 module.exports = mongoose.model('Repairer', schema)