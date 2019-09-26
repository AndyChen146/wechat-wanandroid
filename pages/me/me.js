const app = getApp()

Page({
	data: {
		username: '未登录'
	},
	onLoad(options) {
		let _self = this
	},
	onShow() {
		var _self = this;
		var islogin = wx.getStorageSync("username")
		if (islogin == null || islogin == ""){
			_self.setData({
				username: '未登录'
			})
		}else {
			_self.setData({
				username: islogin
			})
		}
	},
	//登录
	login() {
		var islogin = wx.getStorageSync("username")
		if(islogin != null || islogin == "") {
			wx.navigateTo({
				url: '../login/login',
			})
		}else {
			wx.showToast({
				title: '已登录',
				icon: 'none'
			})
		}
	},
	loginout() {
		var _self = this
		wx.request({
			url: app.globalData.baseUrl + '/loginout?username' + _self.data.username,
			method: 'GET',
			success(res) {
				_self.setData({
					username: '未登录'
				})
				wx.setStorage({
					key: 'username',
					data: '',
				})
				wx.setStorage({
					key: 'password',
					data: '',
				})
				wx.setStorage({
					key: 'userid',
					data: '',
				})
				wx.showToast({
					title: '退出成功',
					icon: 'none',
					duration: 200
				})
			}
		})
	},
	openPage(url){
		var islogin = wx.getStorageSync("username")
		if (islogin == "" || islogin == null) {
			wx.showToast({
				title: '请先登录',
				icon: 'none'
			})
		} else {
			wx.navigateTo({
				url: url,
			})
		}
	},

	addtodo() {
		var islogin = wx.getStorageSync("username")
		if (islogin == "" || islogin == null) {
			wx.showToast({
				title: '请先登录',
				icon: 'none'
			})
		} else {
			wx.navigateTo({
				url: '../todo/todo?type=add&username='+islogin,
			})
		}
	},
	done() {
		var islogin = wx.getStorageSync("username")
		if (islogin == "" || islogin == null) {
			wx.showToast({
				title: '请先登录',
				icon: 'none'
			})
		} else {
			wx.navigateTo({
				url: '../done/done?username=' + islogin,
			})
		}
	},
	about() {
		wx.navigateTo({
			url: '../about/about',
		})
	}
})