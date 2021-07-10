Page({
  data: {
      // 轮播图数组
      announcementList: [],
  },
  //options(Object)
  onLoad: function(options) {
      wx.request({
          // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题 request文件夹的index  // 视频p54
          url: 'http://localhost:3000/admin/api/rest/announcements/fetch/1/999',
          success: (result) => {
            //   console.log('result.data.data', result.data.data);
              this.setData({
                  announcementList: result.data.data
              })
          },
          fail: () => {},
      });

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap: function(item) {

  }
});