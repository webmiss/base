import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 配置
import Env from '@/env'
document.title = Env.title;
Vue.config.productionTip = Env.dev;

// 全局注册
Vue.prototype.$config = Env;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/* 用户点击播放问题 */
document.body.ontouchstart = ()=>{
  try{
    if(plus.os.name!='iOS') document.createElement('audio');
  }catch(e){
    document.createElement('audio');
  }
}