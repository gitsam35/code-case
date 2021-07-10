// pages/registered/index.js
var userMessage={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMessage: {},
    // userInfo: {},
},
getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      // console.log(res);
      userMessage=res.userInfo;
      // console.log('userMessage',userMessage);
      this.setData({
        userMessage: res.userInfo,
      })
    }
  })
},
formSubmit: function(e) {
  // console.log('userMessage.nickName',userMessage.nickName);
  if(userMessage.nickName!=undefined)
  {
  
      var adds = e.detail.value;
      adds.nickName=userMessage.nickName;
      adds.avatarUrl=userMessage.avatarUrl;
    
      if(adds.username!=undefined && adds.password!=undefined){
        wx.navigateTo({
          url: '/pages/login/index'
        })

        wx.request({
          url: 'http://localhost:3000/admin/api/rest/users',
          data: adds,
          method: 'POST', 
          success: function(res) {
                // console.log('registered.res',res);
          },
          fail: function(res) {
              console.log('cuowu' + ':' + res)
          }
      })
      }else{
          wx.showToast({
          title: '用户名和密码不能为空！',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
  }else{
    wx.showToast({
      title: '请点击获取头像昵称进行注册',
      icon: 'none',
      duration: 2000//持续的时间
    })
  }
 
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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