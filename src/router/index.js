import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'

Vue.use(Router)
// 提前定义一下router,原因是设置路由守卫需要使用
const router = new Router({
  routes: [
    // {path: '/',name: 'HelloWorld',component: HelloWorld}
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 获取token,并判断是否存在
  var token = window.sessionStorage.getItem('token')
  if (token === null && to.path !== '/login') {
    // 强制跳转到登陆页面
    return next('/login')
  }
  next() // 继续执行
})

// 导出路由,给min.js使用
export default router
