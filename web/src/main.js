import Vue from 'vue'
import router from './router'

import Config from './config'
import axios from 'axios'
import QRCode from 'qrcode'

// UI
import ElementUI from 'element-ui'
import './assets/theme/index.css'
import App from './App.vue'

// 配置
Vue.config.productionTip = false;
Vue.use(Config);
Vue.use(ElementUI);

// 全局注册
Vue.prototype.$ajax = axios;
Vue.prototype.$storage = window.localStorage;
Vue.prototype.$qrcode = QRCode;

new Vue({
  router,
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