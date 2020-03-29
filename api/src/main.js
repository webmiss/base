import Vue from 'vue'
import router from './router'

import Config from './config'
import axios from 'axios'
import ElementUI from 'element-ui'

// 主题
import './assets/theme/index.css'
import App from './App.vue'

// 全局组件
Vue.prototype.$ajax = axios;
Vue.prototype.$storage = window.localStorage;
// 配置
Vue.use(Config)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
