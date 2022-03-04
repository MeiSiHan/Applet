// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //检查登录态是否过期
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        const accountInfo = wx.getAccountInfoSync();
        console.log(accountInfo)
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
         // 登录
        wx.login({
          success: res => {
            console.log(res)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
