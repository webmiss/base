import { createRouter, createWebHistory } from 'vue-router'
/* 路由 */
const routes = [
  {path:'/', name:'index', component:()=>import('../views/Index.vue')},
  {path:'/demo', name:'Demo', component:()=>import('../views/demo/Demo.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
  // 首页
  {path:'/UserInfo', name:'UserInfo', component:()=>import('../views/system/UserInfo.vue')},
  // {path:'/UserPasswd', name:'UserPasswd', component:()=>import('../views/system/UserPasswd.vue')},
  // 设置
  // {path:'/SysUser', name:'SysUser', component:()=>import('../views/system/User.vue')},
  // {path:'/SysPerm', name:'SysPerm', component:()=>import('../views/system/Perm.vue')},
  // {path:'/SysRole', name:'SysRole', component:()=>import('../views/system/Role.vue')},
  // {path:'/SysConfig', name:'SysConfig', component:()=>import('../views/system/Config.vue')},
  // {path:'/SysMenus', name:'SysMenus', component:()=>import('../views/system/Menus.vue')},
  // {path:'/SysMenusAction', name:'SysMenusAction', component:()=>import('../views/system/Action.vue')},
  // {path:'/SysFileManage', name:'SysFileManage', component:()=>import('../views/system/FileManage.vue')},
  // 业务
]
/* 配置 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 返回上级
router.goBack = function(num){
  this.isBack = true;
  this.go(num);
}

export default router
