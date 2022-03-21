import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmChartLine from '@/components/chart/line.vue'
import wmChartInterval from '@/components/chart/interval.vue'
import wmChartPie from '@/components/chart/pie.vue'

export default defineComponent({
  name: 'Home',
  components: {
    wmMain,wmChartLine,wmChartInterval,wmChartPie
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const chartData: any = {line: [], interval:[]};
    const time: any = null;
    return {state, chartData, time};
  },
  mounted(){
  },
  activated(){
    // 加载数据
    if(Storage.getItem('token')){
      this.loadData();
      // 30刷新
      clearInterval(this.time);
      this.time = setInterval(()=>{
        this.loadData();
      }, 30000);
    }
  },
  // 离开页面
  beforeRouteLeave(to, form, next) {
    clearInterval(this.time);
    next();
  },
  methods:{

    /* 加载数据 */
    loadData() {
      let token = Storage.getItem('token');
      if(!token) return clearInterval(this.time);
      Post('index/getChart',{
        token: token,
      },(res: any)=>{
        const d = res.data;
        if(d.code==0){
          // this.chartData.interval = d.chart1;
          // this.chartData.line = d.chart2;
          // this.chartData.pie = d.chart3;
        }else return Toast(d.msg);
      });
    },

  }
});
