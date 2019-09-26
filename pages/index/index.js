//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: [],
    pagerList: [],
    isRefresh: false,
    pagernumber: 0
  },
  onLoad(options) {
    let _self = this
    wx.request({
      url: app.globalData.baseUrl+'/banner',
      method: 'GET',
      success(res) {
        _self.setData({
          banner: res.data.data
        })
      }
    })
    _self.getIndexPagerData()
  },
  getIndexPagerData() {
    let _self = this
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + '/article/list?pagernumber=' + _self.data.pagernumber,
      method: 'GET',
      success(res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var list = res.data.data.datas
        var collectids = app.globalData.collectids
        for(var i in list) {
          for (var j in collectids){
            if (list[i].id == collectids[j]){
              list[i].collect = true
            }
          }
        }
        if(_self.data.isRefresh) {
          _self.setData({
            pagerList: list,
            isRefresh: false
          })
        }else {
          var templist = _self.data.pagerList
          var resultlist = templist.concat(list)
          _self.setData({
            pagerList: resultlist
          })
        }
      },
      fail() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   *  banner 点击
   */
  imageClick(event) {
    let _self = this;
    var url = event.currentTarget.id
  },
  detail(event) {
    let _self = this;
    var link = event.currentTarget.id
    // wx.navigateTo({
    //   url: '../',
    // })
    wx.setClipboardData({
      data: link,
      success(res) {
        wx.showToast({
          title: '已复制链接成功!'
        })
      }
    })

  },
  chapter(event) {
    let _self = this;
    var url = event.currentTarget.id
  },
  collect(event) {
    let _self = this;
    var islogin = wx.getStorageSync("username")
    if(islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }else {
      var postion = event.currentTarget.id
      var collectid = _self.pagerList[postion].id
      wx.showLoading({
        title: '正在加载中...',
      })
    }
  },
  /**
   * 监听用户下拉动作
   */
  onPullDownRefresh() {
    let _self = this;
    wx.showNavigationBarLoading()
    _self.setData({
      pagernumber: 0,
      isRefresh: true
    })
    _self.getIndexPagerData()
  },
  /**
   *  监听页面上拉动作
   */
  onReachBottom() {
    let _self = this;
    var page = _self.data.pagernumber + 1;
    _self.setData({
      pagernumber: page
    })
    _self.getIndexPagerData()
  }
})
