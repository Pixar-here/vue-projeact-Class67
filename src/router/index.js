import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/',name: 'HelloWorld',component: HelloWorld}
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login}
  ]
})