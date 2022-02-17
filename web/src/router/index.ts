import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path:'/', name:'index', component:()=>import('../views/Index.vue')},
  {path:'/refresh', name:'Refresh', component:()=>import('../views/Refresh.vue')},
  {path:'/docs/:m1/:m2/:m3', name:'docs', component:()=>import('../views/docs/Docs.vue')},
]

/* 配置 */
const router: any = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* 百度统计 */
router.beforeEach(async (to: any, from: any, next: any)=>{
  if(to.path){
    // @ts-ignore
    if(window._hmt) window._hmt.push(['_trackPageview',to.fullPath]);
  }
  next();
});

export default router
