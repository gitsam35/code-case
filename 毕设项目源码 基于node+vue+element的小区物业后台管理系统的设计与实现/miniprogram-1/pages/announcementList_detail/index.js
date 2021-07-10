
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcement_detail:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log('options',options._id);
wx.request({
  // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题 request文件夹的index  // 视频p54
  url: `http://localhost:3000/admin/api/rest/announcements/announcementsId/${options._id}`,
  success: (result) => {
      // console.log('result', result);
      // console.log('result.data.data', result.data);
      this.setData({
          announcement_detail: result.data
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