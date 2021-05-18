import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import NavigateTo from '@/library/ui/ui-navigate-to'
/* UI组件 */
import WmTabbar from '@/components/tabbar/index.vue'
import WmTabbarPage from '@/components/tabbar/page/index.vue'
/* 页面 */
import HomeIndex from './home/Index.vue'
import HomeCode from './home/Code.vue'
import HomeMe from './home/Me.vue'

export default defineComponent({
  name: 'Home',
  components: {WmTabbar,WmTabbarPage,HomeIndex,HomeCode,HomeMe},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 导航
    const tabBar: any = {
      active: 1,
      menus: [{lable: 'Demo', icon: 'icons icon_code'},{lable: '首页', icon: 'icons icon_home'},{lable: '我的', icon: 'icons icon_me'}],
    };
    return {state,tabBar};
  },
  mounted(){
  },
  activated(){
  },
  methods:{

    /* 切换导航 */
    navTab(index: number){
      this.tabBar.active = index;
    },

    /* 打开路由 */
    openUrl(url: string, login: boolean){
      login = login || false;
      NavigateTo('/demo');
      if(login && !this.state.isLogin) return NavigateTo('/user/login');
      else return NavigateTo(url);
    },

  }
});
