import WXlogin from './WXlogin.js'

const request = {}
const headers = {}
// const baseUrl = "http://120.76.200.109:8030" 
const baseUrl = "http://localhost:8030" 

//39.108.220.199
let cookie = ''

request.getbaseUrl =() =>{
 return	baseUrl
} 

request.post = (url, data) => {
	let token = uni.getStorageSync('token')
	return uni.request({
		url: baseUrl + url,
		method: "POST",
		data: data,
		dataType: 'json',
		header: {
		    "content-type": "application/json",
		    "token": token
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			console.log("重新登陆")
			uni.showLoading({
			    title: '正在重新登陆...', 
			});
			WXlogin.wxlogin()
			setTimeout(function () {
			    uni.hideLoading();
			}, 2000);
		}
		return res[1].data
	}).catch(resp => {
	})
}

request.get = (url, parmas) => {
	let token = uni.getStorageSync('token')
	return uni.request({
		url: baseUrl + url,
		method: "GET",
		data: parmas,
		dataType: 'json',
		header: {
		    "content-type": "application/json",
		    "token": token
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			console.log("重新登陆")
			WXlogin.wxlogin()
		}
		return res[1].data
	}).catch(resp => {

	})
}

request.put = (url, data) => {
	let token = uni.getStorageSync('token')
	return uni.request({
		url: baseUrl + url,
		method: "PUT",
		data: data,
		dataType: 'json',
		header: {
		    "content-type": "application/json",
		    "token": token
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			console.log("重新登陆")
			WXlogin.wxlogin()
		}
		return res[1].data
	}).catch(resp => {

	})
}

request.delete = (url, id) => {
	let token = uni.getStorageSync('token')
	return uni.request({
		url: baseUrl + url + '/' + id,
		method: "DELETE",
		dataType: 'json',
		header: {
		    "content-type": "application/json",
		    "token": token
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			console.log("重新登陆")
			WXlogin.wxlogin()
		}
		return res[1].data
	}).catch(resp => {

	})
}

request.upload = (url, file) => {
	let token = uni.getStorageSync('token')
	return uni.uploadFile({
		url:  baseUrl + url,
		filePath: file,
		name: "img",
		fileType: "image",
		header: {
		    "content-type": "application/json",
		    "token": token
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			console.log("重新登陆")
			WXlogin.wxlogin()
		}
		return res[1].data
	}).catch(resp => {

	})

}




export default request
