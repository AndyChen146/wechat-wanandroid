const app = getApp()

Page({
	data: {
		pagerList: [],
		pagerTitles: [],
		pagenumber: 1,
		isRefresh: false
	},
	onLoad() {
		this.getPagerData()
	},
	getPagerData() {
		let _self = this;
		wx.showNavigationBarLoading()
		wx.request({
			url: app.globalData.baseUrl+'/query',
			method: 'post',
			data: {
				pagernumber: _self.data.pagenumber,
				key: app.globalData.key
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success(res) {
				wx.hideNavigationBarLoading()
				wx.stopPullDownRefresh()
				var list = res.data.data.datas
				if(_self.data.isRefresh) {
					_self.setData({
						pagerList: list,
						isRefresh: false
					})
				}else {
					var templist = _self.data.pagerList
					var resultList = templist.concat(list)
					_self.setData({
						pagerList: resultList
					})
				}

				let titles = [];
				for(var i in _self.data.pagerList) {
					var title = _self.data.pagerList[i].title
					title = title.replace(/<[^>]+>/g,"")
					title = title.replace(/&amp;/g,"、")
					title = title.replace(/&mdash;/g,"-")
					titles.push(title)
				}
				_self.setData({
					pagerTitles: titles
				})
			},
			fail() {
				wx.hideNavigationBarLoading()
				wx.stopPullDownRefresh()
			}
		})
	},

	//监听用户下拉动作
	onPullDownRefresh() {
		let _self = this;
		wx.showNavigationBarLoading()
		_self.setData({
			pagenumber: 0,
			isRefresh: true
		})
		_self.getPagerData()
	},
	// 页面上拉加载
	onReachBottom() {
		let _self = this;
		var page = _self.data.pagenumber + 1
		_self.setData({
			pagenumber: page
		})
		_self.getPagerData()
	}
})