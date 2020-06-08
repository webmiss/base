import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 点击相同路由报错问题 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {path:'/', name:'index', component:()=>import('./views/Index.vue')},
    {path:'/Request/:name', name:'Request', component:resolve=>require(['./views/Request.vue'],resolve)},
  ]
})
