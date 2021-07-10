const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String, // 车主姓名
    phone: Number, // 车主电话
    parkingAdress: String, // 车位区域 outdoor是室外, under是室内
    carNo: String, // 车位号
    carCard: String, // 车牌号
    communityName: String // 小区名
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});

module.exports = mongoose.model("Car", schema);