import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path:'/', name:'index', component:()=>import('../views/Index.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
]

/* 配置 */
const router: any = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

/* 返回上级 */
router.goBack = function(num: number){
  this.isBack = true;
  this.go(num);
}

export default router
