import request from 'utils/request.js'

const api = {}

//用户登录api接口
api.login = (data) => request.post('/user/login', data)

//用户登录api接口
api.getUserInfo = (token) => request.get('/user/info?token=' + token)

//用户登录api接口
api.updateUser = (data) => request.put('/user', data)

//delete请求示例
api.admUpdataRole = (id) => request.delete('/user?id=', id)

//put请求示例
api.admUpdataInfo = (user) => request.put('/user', user)

//get请求示例
api.verify = (phone) => request.get('/user/isExits?tel=' + phone)

export default api
