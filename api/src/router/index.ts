import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path:'/', name:'index', component:()=>import('../views/Index.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
]

/* 配置 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
