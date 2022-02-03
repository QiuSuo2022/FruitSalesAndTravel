import WXlogin from './WXlogin.js'

const request = {}
const headers = {}
const baseUrl = "http://8.129.44.6:8002" 

request.getbaseUrl =() =>{
 return	baseUrl
} 

request.post = (url, parmas) => {
	let token = uni.getStorageSync('token')
	uni.showLoading({
		title:"加载中"
	})
	return uni.request({
		url: baseUrl + url, 
		method: "POST",
		data: parmas,
		// dataType: 'json',
		header: {
		    "content-type": "application/x-www-form-urlencoded", 
		    "token": token,
			// "status": 0 
		},
	}).then(res => {
		// if(res[1].statusCode == 423){
		// 	uni.showLoading({
		// 	    title: '正在重新登陆...', 
		// 	});
		// 	WXlogin.wxlogin()
		// 	setTimeout(function () {
		// 	    uni.hideLoading();
		// 	}, 2000);
		// }
		// if (res[1].header['Set-Cookie']) {
		// 	let cookies = res[1].header['Set-Cookie'].split(';')
		// 	for (let i = 0; i < cookies.length; i++) {
		// 		if (cookies[i].indexOf("JSESSIONID") != -1) {
		// 			cookie = cookies[i]
		// 			break
		// 		}
		// 	}
		// }
		uni.hideLoading()
		return res[1].data
	}).catch(resp => {
		
	})
}

request.get = (url,parmas) => {
	let token = uni.getStorageSync('token')
	uni.showLoading({
		title:"加载中"
	})
	return uni.request({
		url: baseUrl + url,
		data: parmas,
		method: "GET",
		dataType: 'json',
		header: {
		    "content-type": "application/x-www-form-urlencoded",
		    "token": token
		},
	}).then(res => {
		// if(res[1].statusCode == 423){
		// 	WXlogin.wxlogin()
		// }
		uni.hideLoading()
		return res[1].data
	}).catch(resp => {

	})
}

request.put = (url, data) => {
	uni.showLoading({
		title:"加载中"
	})
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
		// if(res[1].statusCode == 423){
		// 	WXlogin.wxlogin()
		// }
		uni.hideLoading()
		return res[1].data
	}).catch(resp => {

	})
}

request.delete = (url, data) => {
	uni.showLoading({
		title:"加载中"
	})
	let token = uni.getStorageSync('token')
	return uni.request({
		url: baseUrl + url + data,
		method: "DELETE",
		dataType: 'json',
		header: {
		    // "content-type": "application/x-www-form-urlencoded",
		    "token": token,
			//"Cookie": cookie
		},
	}).then(res => {
		// if(res[1].statusCode == 423){
		// 	WXlogin.wxlogin()
		// }
		uni.hideLoading()
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
		    "token": token,
			"Cookie": cookie
		},
	}).then(res => {
		if(res[1].statusCode == 423){
			WXlogin.wxlogin()
		}
		return res[1].data
	}).catch(resp => {

	})

}




export default request
