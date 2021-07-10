 const mongoose = require("mongoose")
 const schema = new mongoose.Schema({
     name: String, // 业主姓名
     name2: String, // 业主姓名
     phone: Number, // 业主电话
     phone2: Number, // 业主电话
     isLive: Number, // 是否有人入住 0否, 1是
     //  isLive: String, // 是否有人入住 0否, 1是
     //  merchantId: String, // 物业公司
     communityName: String, // 小区名
     buildingNo: String, // 楼号
     //  unitNo: String, // 单元号
     roomNo: String, // 房间号
     houseArea: String, // 房间面积


 }, {
     timestamps: {
         createdAt: 'createTime',
         updatedAt: 'updateTime'
     }
 })

 module.exports = mongoose.model('House', schema)