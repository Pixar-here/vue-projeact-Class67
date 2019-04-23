import Vue from 'vue'
import App from './App'
import router from './router'
// 引入全局css样式文件
import './assets/css/global.css'
// 引入“图标”css样式文件
import './assets/fonts/iconfont.css'

import axios from 'axios'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// axios配置请求公共根地址
axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
// 设置拦截器,给axios装配token信息会
axios.interceptors.request.use(
  function(config) {
    // config: 对象,是axios的自己成员
    // 可以对其进行配置,这个配置信息直接作用给axios
    // 获取token
    var token = window.sessionStorage.getItem('token')
    // 给axios的请求头中设置token信息,名称为Authorization
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 给axios配置成为Vue的成员
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
