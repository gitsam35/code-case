var userLogin= {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formdata: '',
    }, 
    formSubmit: function(e) {
        userLogin = wx.getStorageSync("userLogin");
        // this.setData({userLogin});
        var adds = e.detail.value;
        adds.repairState='正在处理'
    //    if(adds.phone) 
        adds.username=userLogin.username
        wx.request({
            url: 'http://localhost:3000/admin/api/rest/repairments',
            data: adds,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT this.$http.post("rest/repairers", this.addForm);
            // header: { // 设置请求的 header
            //     'content-type': 'application/x-www-form-urlencoded'
            // },
            success: function(res) {
                console.log('res',res.data);
                console.log('res',e.detail.value);
                //   wx.navigateTo({
                //     url: '/pages/repair_detail/index?id=' + res.data._id,
                //   })
            },
            fail: function(res) {
                console.log('cuowu' + ':' + res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})