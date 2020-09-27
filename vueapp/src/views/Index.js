import NavigateTo from '../library/ui/ui-navigate-to'
/* 组件 */
import WmTabbar from '@/components/tabbar'
import PageView from '@/components/page-view'

export default {
  components: {WmTabbar,PageView},
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
      NavigateTo(this,'/demo');
      if(login && !this.$store.state.isLogin) return NavigateTo(this,'/user/login');
      else return NavigateTo(this,url);
    },

  }
}