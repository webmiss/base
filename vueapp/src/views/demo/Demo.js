import Env from '../../env'
import Back from '../../library/ui/ui-back'
import NavigateTo from '../../library/ui/ui-navigate-to'
/* 组件 */
import PageView from '@/components/page-view'
import WmScrollView from '@/components/scroll-view'

export default {
  components: {PageView,WmScrollView},
  data(){
    return {
      Env: Env,
      lists: [],
    }
  },
  computed:{
  },
  mounted(){
    this.lists = this.getData(3);
    this.$refs.DemoScroll.refresh();
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

    /* 返回 */
    back(res){
      if(res=='left') return Back(this,1);
    },

    /* 导航 */
    openUrl(url,parm,login){
      login = login || false;
      if(login && !this.$store.state.isLogin) return NavigateTo(this,'/sys/login');
      else return NavigateTo(this,url,parm);
    },

    /* 下拉刷新 */
    reFresh(res){
      console.log('刷新',res);
      this.lists = this.getData(8);
      this.$refs.DemoScroll.pullDownFinish();
    },

    /* 上拉加载 */
    upLoad(d){
      console.log('加载',d);
      let data = this.getData(10);
      for(let i in data) this.lists.push(data[i]);
      this.$refs.DemoScroll.pullUpFinish();
    },

    /* 滚动 */
    scroll(res){
      // console.log(res);
    },

    /* 数据 */
    getData(n){
      let data = [];
      for(let i=0; i<n; i++) data.push({name:'Test'+(i+1)});
      return data;
    },

  }
}