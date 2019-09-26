// /pages/hot/hot.js
const app = getApp()

Page({
	data: {
		//随机颜色
		colorArr: ["#0000FF", "#008B00", "#FFC125", "#FF6A6A", "#FF1493", "#8A2BE2", "#EE1289", "#32CD32"],
		items: [],
		netaddress: [],
		key: ''
	},
	onLoad(options) {
		let _self = this
		_self.gethotkey()
		_self.getnetaddress()
	},
	gethotkey() {
		let _self = this;
		wx.request({
			url: app.globalData.baseUrl+'/hotkey',
			method: 'GET',
			success(res) {
				_self.setData({
					items: res.data.data
				})
			}
		})
	},
	getnetaddress() {
		let _self = this;
		wx.request({
			url: app.globalData.baseUrl + '/friend',
			method: 'GET',
			success(res) {
				_self.setData({
					netaddress: res.data.data
				})
			}
		})
	},
	keysou(e){
		this.setData({
			key: e.detail.value
		})
	},
	keyclick() {
		if(this.data.key == ''){
			wx.showToast({
				title: '请输入关键字',
				icon: 'none'
			})
		}else {
			app.globalData.key = this.data.key
			wx.navigateTo({
				url: '../search/search',
			})
		}
	},
	wehotkey(e) {
		app.globalData.key = e.currentTarget.id
		wx.navigateTo({
			url: '../search/search',
		})
	},
	net(e) {
		app.globalData.key = e.currentTarget.id
		wx.navigateTo({
			url: '../search/search',
		})
	}

})