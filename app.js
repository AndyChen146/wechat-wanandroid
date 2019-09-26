//app.js
App({
  onLaunch: function () {
    

    wx.setTabBarBadge({
      	index: 1,
      	text: this.globalData.hotNum,
    })
  },
  globalData: {
    userInfo: null,
    mainColor: "#1B82D1",
    baseUrl: "https://www.mtjsoft.cn/wanandroid/api",
    key: '',
    collectids: [],
    systemtypelist: [],
    desclink: '',
    hotNum: '0'
  }
})