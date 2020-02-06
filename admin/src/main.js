import Vue from 'vue'
import router from './router'
import store from './store'

import Config from './config'
import axios from 'axios'
import QRCode from 'qrcode'
import ElementUI from 'element-ui'

// 主题（element-ui/lib/theme-chalk/index.css）
import './assets/theme/index.css'
import App from './App.vue'

// 全局组件
Vue.prototype.$ajax = axios;
Vue.prototype.$storage = window.localStorage;
Vue.prototype.$qrcode = QRCode;
// 配置
Vue.use(Config)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
