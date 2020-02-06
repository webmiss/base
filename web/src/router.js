import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 路由配置 */
const routes = [
  {path:'/', name:'index', component:resolve=>require(['./views/Index.vue'],resolve)},
  {path:'/project', name:'project', component:resolve=>require(['./views/Project.vue'],resolve)},
  {path:'/doc', name:'doc', component:resolve=>require(['./views/Doc.vue'],resolve)},
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
