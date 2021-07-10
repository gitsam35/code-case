var userLogin= {};
Page({
  data: {
  userLogin: {},
  },
  
  onLoad() { 
    
  },
  onShow:function(e){
    userLogin = wx.getStorageSync("userLogin");
    this.setData({userLogin});
      this.onLoad();
},
 
})