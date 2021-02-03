import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 用户点击播放问题 */
document.body.ontouchstart = ()=>{
  try{
    document.addEventListener("plusready",(res)=>{
      // @ts-ignore
      if(plus.os.name != 'iOS') document.createElement('audio');
    },false);
  }catch(e){
    document.createElement('audio');
  }
}

/* App */
const app: any = createApp(App).use(store).use(router).mount('#app');
export default app;
