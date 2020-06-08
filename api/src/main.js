import Vue from 'vue'
import router from './router'

// 主题（element-ui/lib/theme-chalk/index.css）
import ElementUI from 'element-ui'
import './assets/theme/index.css'
import App from './App.vue'

// 配置
import Env from '@/env'
document.title = Env.title;
Vue.config.productionTip = Env.dev;

// 全局注册
Vue.prototype.$config = Env;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
