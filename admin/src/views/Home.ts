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
    const type: any = 't1';
    // 今日流量
    const tData: any = {
      time: '',
      today:{pv:0, uv:0, ip:0, ratio:0, time:0},
      yesterday:{pv:0, uv:0, ip:0, ratio:0, time:0},
      chart: [],
    };
    return {state, time, tData, type};
  },
  mounted(){
  },
  activated(){
    // 加载数据
    if(Storage.getItem('token')){
      this.loadData();
      // 60秒刷新
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

    /* 趋势分析 */
    Trend(type: string) {
      this.type = type;
      this.loadData();
    },

    /* 加载数据 */
    loadData() {
      let token = Storage.getItem('token');
      if(!token) return clearInterval(this.time);
      const load: any = Loading();
      Post('index/getChart',{
        token: token,
        type: this.type,
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.tData.time = TimeDate();
          this.tData.today = d.data['TrendRpt']['today'];
          this.tData.yesterday = d.data['TrendRpt']['yesterday'];
          this.tData.chart = d.data['Trend'];
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

    /* 跳转菜单 */
    openMenus(url: string) {
      let res: boolean = true;
      for(let x in this.state.menus){
        if(!this.state.menus[x].children) continue;
        for(let y in this.state.menus[x].children){
          if(!this.state.menus[x].children[y].children) continue;
          for(let z in this.state.menus[x].children[y].children){
            let arr: any = this.state.menus[x].children[y].children[z];
            if(url==arr.value.url){
              res = false;
              let pos = [x,y,z];
              Storage.setItem('menusPos',JSON.stringify(pos));
              location.reload();
            }
          }
        }
      }
      if(res) return Toast('无法访问!');
    },

  }
});
