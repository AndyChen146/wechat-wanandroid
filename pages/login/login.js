const app = getApp()

Page({
	data: {
		username: '',
		password: ''
	},
	onLoad(options) {

	},
	loginusername(e) {
		this.setData({
			username: e.detail.value
		})
	},
	loginpassword(e) {
		this.setData({
			password: e.detail.value
		})
	},
	//登录
	clicklogin() {
		var _self = this;
		var username = _self.data.username
		var password = _self.data.password
		if (username == '') {
			wx.showToast({
				title: '请输入用户名',
				icon: 'none'
			})
		} else if (password == ''){
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			})
		}else {
			wx.showLoading({
				title: '正在加载中...',
			})
			wx.request({
				url: app.globalData.baseUrl+'/login',
				method: 'POST',
				data: {
					username: username,
					password: password
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success(res) {
					wx.hideLoading()
					if(res.data.errorCode != 0){
						wx.showToast({
							title: res.data.errorMsg,
							icon: 'none'
						})
					}else {
						app.globalData.collectids = res.data.data.collectIds
						wx.showToast({
							title: '登录成功',
							icon: 'success',
							duration: 200
						})
						wx.setStorage({
							key: 'username',
							data: res.data.data.username,
						})
						wx.setStorage({
							key: 'password',
							data: res.data.data.password,
						})
						wx.setStorage({
							key: 'userid',
							data: res.data.data.id,
						})
						wx.navigateBack({
							delta: 1
						})
					}
				},
				fail() {
					wx.hideLoading()
				}
			})
		}
	},
	register() {
		wx.navigateTo({
			url: '../register/register',
		})
	}
})