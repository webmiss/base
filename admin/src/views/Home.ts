import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
import TimeDate from '@/library/time/date'
import TimeFormatHour from '@/library/time/format_hour'
import PriceFormat from '@/library/price/format'
import PricePercentage from '@/library/price/percentage'
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
    const time: any = null;
    // const chartData: any = {line: [], interval:[]};
    // 今日流量
    const tData: any = {time: '', today:{}, yesterday:{}};
    return {state, time, tData};
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
      }, 60000);
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
        console.log(d);
        if(d.code==0){
          this.tData.time = TimeDate();
          this.tData.today = d.data['TrendRpt']['today'];
          this.tData.yesterday = d.data['TrendRpt']['yesterday'];
        }else return Toast(d.msg);
      });
    },

    /* 格式化-数字 */
    FormatNum(num: string) {
      return PriceFormat.encode(num, 0);
    },
    /* 格式化-百分比 */
    FormatPercentage(n1: number, n2: number) {
      return PricePercentage(n1, n2);
    },
    /* 格式化-小时 */
    FormatHour(second: number) {
      return TimeFormatHour.encode(second);
    },

  }
});
