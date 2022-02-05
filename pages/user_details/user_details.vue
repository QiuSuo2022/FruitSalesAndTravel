<template>
	<view>
		<form v-if="seen">
			<view class="cu-form-group margin-top">
				<view class="title">头像</view>
				<view class="cu-avatar radius bg-gray" :style="'background-image:url('+form.avatarUrl+');'"></view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input v-model="form.userName" :placeholder="form.userName === null ? '请输入用户名' : form.userName"
					name="userName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input v-model="form.realName" name="realName"
					:placeholder="form.realName === null ? '请输入真实姓名' : form.userName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'未知'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">Email</view>
				<input v-model="form.email" :placeholder="form.email === null ? '请输入电子邮箱' : form.userName"
					name="email"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input v-model="form.phone" :placeholder="form.phone === null ? '请输入手机号' : form.userName"
					name="phone"></input>
			</view>
		</form>
		<view class="padding flex flex-direction margin-top: 50px" @click="Edit2">
			<button class="cu-btn bg-green lg">保存信息</button>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../utils/graceChecker.js");
	export default {
		data() {
			return {
				//个人的数据
				index: -1,
				picker: ['男', '女'],
				form: {
					avatarUrl: "",
					userName: "",
					realName: "",
					gender: "",
					phone: "",
					email: "",
				},
				seen: true,
				look: false,
				checkRes: false,
				popMessage: "",
				popType: "",
			}
		},
		methods: {
			checkform: function() {
				var rule = [{
						name: "phone",
						checkType: "string",
						checkRule: "11",
						errorMsg: "请输入11位数的手机号"
					},
					{
						name: "userName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "用户名不能为空"
					},
					{
						name: "realName",
						checkType: "string",
						checkRule: "2,4",
						errorMsg: "请输入正确的真实姓名"
					},
					{
						name: "email",
						checkType: "email",
						checkRule: "",
						errorMsg: "请输入正确的真实姓名"
					}
				];
				var formData = this.form;
				this.checkRes = graceChecker.check(formData, rule);
				if (!this.checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},

			tap: function() {
				wx.navigateBack({})
			},

			requestData() {
				const token = uni.getStorageSync('token');
				this.$api.getUserInfo(token).then(res => {
					console.log("requestData")
					console.log(res)
					this.form.avatarUrl = res.data.avatarUrl;
					this.form.userName = res.data.userName;
					this.form.realName = res.data.realName;
					this.form.email = res.data.email;
					this.index = res.data.gender
					if (res.data.gender === '0') {
						this.form.gender = '男'
					} else {
						this.form.gender = '女'
					}
					this.form.phone = res.data.phone;
				})
			},

			PickerChange(e) {
				this.index = e.detail.value
				this.form.gender = this.picker[e.detail.value];
				console.log(this.form.gender)
			},

			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["compressed"],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						this.$api.uploadImage(tempFilePaths[0]).then(resp => {
							let res = JSON.parse(resp)
							if (res.status === 0) {
								this.form.avatarUrl = this.$request.getbaseUrl() + "/img/" + res
									.data
							}
						})
					}
				});
			},

			Edit2: function() {
				var updateUser = Object.assign({}, this.form);
				updateUser.gender = this.index
				console.log("update")
				console.log(updateUser)
				this.checkform()
				if (!this.checkRes) {
					this.checkform()
				} else {
					var that = this
					this.$api.updateUser(updateUser).then(res => {
						uni.showToast({
							title: "修改成功",
							icon: "none"
						});
						setTimeout(function() {
							uni.reLaunch({
							  url: '../mine/mine'
							});
						}, 1300);
					}).catch(resp => {
						uni.showToast({
							title: "修改失败，请稍后再试!",
							icon: "none"
						});
					});
				}
			},


		},

		created: function() {
			this.requestData()
		},
	}
</script>

<style>

</style>
