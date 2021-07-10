
Page({
  data: {
  
},
formSubmit: function(e) {
    var adds = e.detail.value;
    wx.request({
        url: 'http://localhost:3000/WeChat/api/login',
        data: adds,
        method: 'POST',  // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT this.$http.post("rest/repairers", this.addForm);
        // header: { // 设置请求的 header
        //     'content-type': 'application/x-www-form-urlencoded'
        // },
        success: function(res) {
            if(res.statusCode==200){
                wx.switchTab({
                    url: '/pages/index/index'
                  })
            }else{
                wx.showToast({
                    title: '请输入正确的用户名和密码！',
                    icon: 'none',
                    duration: 2000//持续的时间
                  })
            }
            // 把获取的用户信息存到setStorageSync
            wx.setStorageSync("userLogin",res.data);
        },
        fail: function(res) {
            console.log('cuowu' + ':' + res)
        }
    })
},
      
  
})