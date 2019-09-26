const app = getApp()

Page({
	data: {
		tixiList: [],
		colorArr: ["#4DCCF6", "#FF9999", "#999933", "#009999", "#FF9900", "#009999"],
	},
	onLoad(){
		this.gettixiList()
	},
	//获取信息
	gettixiList() {
		let _self = this;
		wx.request({
			url: app.globalData.baseUrl+'/tree',
			method: 'GET',
			success(res) {
				_self.setData({
					tixiList: res.data.data
				})
			}
		})
	},

	tixiclick(event) {
		var index = event.currentTarget.id
		let _self = this;
		app.globalData.systemtypelist = _self.data.tixiList[index].children
		// wx.navigateTo({
		// 	url: '../systemlist/systemlist?title=' + _self.data.tixiList[index].name,
		// })
		console.log(index)
	}
})