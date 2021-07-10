if (wx.getUserProfile) {
  /**
   * isCache  是否用户授权第一次，就把用户信息放到缓存中，以后不用获取最新的，直接拿缓存
   */
  let isCache = true

  Object.defineProperty(wx, 'getUserInfo', {
    configurable: true,
    value: function (callback) {
      if (wx.authorizationInfo) {
        callback.success(wx.authorizationInfo)
        return;
      } else if (isCache) {
        let storageInfo = wx.getStorageSync('authorizationInfo')
        if (storageInfo) {
          wx.authorizationInfo = storageInfo
          callback.success(wx.authorizationInfo)
          return;
        }
      }
      let success = callback.success
      callback.success = function (e) {
        wx.authorizationInfo = e
        if (isCache) {
          wx.setStorageSync('authorizationInfo', e)
        }
        success(e)
      }
      wx.getUserProfile({
        desc: '展示用户信息',
        ...callback
      });
    }
  })
}