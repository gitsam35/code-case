var userLogin= {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
          })
          // console.log();
    wx.request({
      // url: `http://localhost:3000/admin/api/rest/Repairments/id/60b260cd720a0383203c6942`,
      url: 'http://localhost:3000/admin/api/rest/repairments/fetch/1/10',
      success: (result) => {
          console.log('result.data.data', result.data.data);
          this.setData({
            repairList: result.data.data
          })
      },
      fail: () => {},
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userLogin = wx.getStorageSync("userLogin");
    this.setData({userLogin});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})