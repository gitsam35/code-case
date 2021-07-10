Page({
    data: {
        // 轮播图数组
        swiperList: [],
    },
    
    onLoad: function(options) {
        wx.request({
            // 1 发送异步请求获取轮播图数据 
            url: 'http://localhost:3000/admin/api/rest/Shufflings/fetch/1/3/',
            success: (result) => {
                // console.log('result', result);
                // console.log('result.data.data', result.data.data);
                this.setData({
                    swiperList: result.data.data
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