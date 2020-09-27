import { createRouter, createWebHashHistory } from 'vue-router'
/* 路由 */
const routes = [
  {path:'/', name:'index', meta:{keepAlive:true}, component:()=>import('../views/Index.vue')},
  {path:'/refresh', name:'Refresh', meta:{keepAlive:false}, component:()=>import('../views/Refresh.vue')},
  {path:'/demo', name:'Demo', meta:{keepAlive:false}, component:()=>import('../views/demo/Demo.vue')},
]
/* 配置 */
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 返回上级
router.goBack = function(num){
  this.isBack = true;
  this.go(num);
}

export default router
