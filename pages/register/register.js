const app = getApp()

Page({
	data: {
		username: '',
		password: ''
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
	clickregister() {
		var _self = this;
		var username = _self.data.username
		var password = _self.data.password
		if (username == "") {
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
				url: app.globalData.baseUrl+'/register',
				method: 'post',
				data: {
					username: username,
					password: password
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success(res) {
					wx.hideLoading()
					if(res.data.errorCode != 0) {
						wx.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}else {
						wx.showToast({
							title: '注册成功',
							icon: 'success',
							duration: 200
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
	}
})