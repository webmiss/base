import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* App */
const app: any = createApp(App).use(store).use(router).mount('#app');
export default app;
