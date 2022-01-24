<template>
	<view>
		<button @click="getUserProfile()">微信登录</button>
	</view>
</template>

<script>
	import api from "../../utils/api.js"
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			getUserProfile(e) {
				let that = this
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						that.userInfo = res.userInfo
						that.bindGetUserInfo()
					}
				})
			
			},
			bindGetUserInfo(e) {
				let that = this
				wx.login({
					success(res) {
						console.log(res.code)//获得token参数
						uni.showLoading({
							title: "登录中"
						})
						//api请求
						api.login(res.code,that.userInfo.avatarUrl,that.userInfo.nickName,that.userInfo.gender).then((data) => {
							console.log(data)
							uni.hideLoading()
							//将用户信息和token存在本地
							uni.setStorageSync("user", data.data.data)
							uni.setStorageSync('token', data.data.data.token)
						})
					}
				})
			},
		}
	}
</script>

<style>
	button {
		margin-top: 50rpx;
		background-color: #007AFF;
	}
</style>
