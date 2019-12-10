import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 路由配置 */
const routes = [
  {path:'/', name:'index', component:()=>import('./views/Index.vue')},
  {path:'/UserInfo', name:'UserInfo', component:resolve=>require(['./views/system/UserInfo.vue'],resolve)},
  {path:'/UserPasswd', name:'UserPasswd', component:resolve=>require(['./views/system/UserPasswd.vue'],resolve)},
  {path:'/WebMsg', name:'WebMsg', component:resolve=>require(['./views/system/Msg.vue'],resolve)},
  // 设置
  {path:'/SysConfig', name:'SysConfig', component:resolve=>require(['./views/system/Config.vue'],resolve)},
  {path:'/SysMenus', name:'SysMenus', component:resolve=>require(['./views/system/Menus.vue'],resolve)},
  {path:'/SysMenusAction', name:'SysMenusAction', component:resolve=>require(['./views/system/Action.vue'],resolve)},
  {path:'/SysUser', name:'SysUser', component:resolve=>require(['./views/system/User.vue'],resolve)},
  {path:'/SysRole', name:'SysRole', component:resolve=>require(['./views/system/Role.vue'],resolve)},
  {path:'/SysFileManage', name:'SysFileManage', component:resolve=>require(['./views/system/FileManage.vue'],resolve)},
  // 业务
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
