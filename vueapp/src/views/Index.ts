import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import NavigateTo from '@/library/ui/ui-navigate-to'
/* UI组件 */
// import WmTabbar from '@/components/tabbar'
// import PageView from '@/components/page-view'

export default defineComponent({
  // components: {WmTabbar,PageView},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 导航
    const tabBar: Object = {active:0};
    return {state,tabBar};
  },
  computed:{
    // @ts-ignore
    mode(){ return this.state.mode; },
  },
  mounted(){
    // 调试深色模式
    // setTimeout(()=>{ this.state.mode='dark'; },3000);
  },
  activated(){
  },
  methods:{

    /* 切换导航 */
    navTab(index: number){
      console.log(index);
    },

    /* 打开路由 */
    openUrl(url: string, login: boolean){
      login = login || false;
      NavigateTo(this,'/demo');
      if(login && !this.state.isLogin) return NavigateTo(this,'/user/login');
      else return NavigateTo(this,url);
    },

  }
});
