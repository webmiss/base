import Vue from 'vue'

/* 组件 */
import PageView from '@/components/page-view'
import Tabbar from '@/components/tabbar'
Vue.component('page-view',PageView);
Vue.component('wm-tabbar',Tabbar);

export default {
  data(){
    return {
      // 底部导航
      tabBar: {active:0},
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
    // 调试深色模式
    // setTimeout(()=>{ this.$store.state.mode='dark'; },3000);
  },
  activated(){
  },
  methods:{

    /* 切换导航 */
    navTab(index){
      console.log(index);
    },

    /* 打开路由 */
    openUrl(url,login){
      login = login || false;
      if(login && !this.$store.state.isLogin) return this.$router.push('/user/login');
      else return this.$router.push(url);
    },

  }
}