import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path:'/', name:'home', component:()=>import('../views/Home.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
  {path:'/demo', name:'Demo', meta:{keepAlive:false}, component:()=>import('../views/demo/Demo.vue')},
  // 首页
  {path:'/UserInfo', name:'UserInfo', component:()=>import('../views/system/UserInfo.vue')},
  {path:'/UserPasswd', name:'UserPasswd', component:()=>import('../views/system/UserPasswd.vue')},
  // 系统
  {path:'/SysFileManage', name:'SysFileManage', component:()=>import('../views/system/FileManage.vue')},
  {path:'/SysUser', name:'SysUser', component:()=>import('../views/system/User.vue')},
  {path:'/SysRole', name:'SysRole', component:()=>import('../views/system/Role.vue')},
  {path:'/SysMenus', name:'SysMenus', component:()=>import('../views/system/Menus.vue')},
  {path:'/ApiMenus', name:'ApiMenus', component:()=>import('../views/system/ApiMenus.vue')},
  {path:'/ApiRole', name:'ApiRole', component:()=>import('../views/system/ApiRole.vue')},
  {path:'/SysConfig', name:'SysConfig', component:()=>import('../views/system/Config.vue')},
  {path:'/SysHelp', name:'SysHelp', component:()=>import('../views/system/Help.vue')},
  // 内容
  {path:'/News', name:'News', component:()=>import('../views/web/News.vue')},
  {path:'/NewsClass', name:'NewsClass', component:()=>import('../views/web/NewsClass.vue')},
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
