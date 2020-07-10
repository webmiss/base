import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 返回上级
VueRouter.prototype.goBack = function(num){
  this.isBack = true;
  this.go(num);
}

/* 路由配置 */
const routes = [
  {path:'/', name:'index', meta:{keepAlive:true}, component:resolve=>require(['./views/Index.vue'],resolve)},
  {path:'/refresh', name:'Refresh', meta:{keepAlive:false}, component:resolve=>require(['./views/Refresh.vue'],resolve)},
  {path:'/demo', name:'Demo', meta:{keepAlive:false}, component:resolve=>require(['./views/demo/Demo.vue'],resolve)},
];

/* 点击相同路由报错问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 创建路由 */
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
export default router
