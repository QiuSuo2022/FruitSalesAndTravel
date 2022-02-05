import App from './App'
import api from 'utils/api.js'
import request from 'utils/request.js'
import WXlogin from 'utils/WXlogin.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

Vue.prototype.$api = api
Vue.prototype.$request = request
Vue.prototype.$WXlogin = WXlogin

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif