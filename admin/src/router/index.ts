import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path:'/', name:'home', component:()=>import('../views/Home.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
  {path:'/demo', name:'Demo', meta:{keepAlive:false}, component:()=>import('../views/demo/Demo.vue')},
  // 首页
  {path:'/UserInfo', name:'UserInfo', component:()=>import('../views/system/UserInfo.vue')},
  {path:'/UserPasswd', name:'UserPasswd', component:()=>import('../views/system/UserPasswd.vue')},
  // 设置
  {path:'/SysUser', name:'SysUser', component:()=>import('../views/system/User.vue')},
]

/* 配置 */
const router: any = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* 返回上级 */
router.goBack = function(num: number){
  this.isBack = true;
  this.go(num);
}

export default router
