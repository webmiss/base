import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmChartLine from '@/components/chart/line.vue'
import wmChartInterval from '@/components/chart/interval.vue'
import wmChartPie from '@/components/chart/pie.vue'
/* ElementUI */
// import { ElButton } from 'element-plus';
// import '@/assets/themes/button.css'

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
    return {state, chartData};
  },
  mounted(){
    this.loadChart();
  },
  activated(){
  },
  methods:{

    /* 图表数据 */
    loadChart() {
      // 折线图
      this.chartData.line = [
        {type: '收入', label:'1月', value:50},
        {type: '支出', label:'1月', value:10},
        {type: '收入', label:'2月', value:20},
        {type: '支出', label:'2月', value:30},
        {type: '收入', label:'3月', value:36},
        {type: '支出', label:'3月', value:10},
        {type: '收入', label:'4月', value:82},
        {type: '支出', label:'4月', value:20},
        {type: '收入', label:'5月', value:32},
        {type: '支出', label:'5月', value:49},
        {type: '收入', label:'6月', value:48},
        {type: '支出', label:'6月', value:59},
        {type: '收入', label:'7月', value:92},
        {type: '支出', label:'7月', value:60},
        {type: '收入', label:'8月', value:73},
        {type: '支出', label:'8月', value:70},
        {type: '收入', label:'9月', value:85},
        {type: '支出', label:'9月', value:39},
        {type: '收入', label:'10月', value:62},
        {type: '支出', label:'10月', value:94},
        {type: '收入', label:'11月', value:68},
        {type: '支出', label:'11月', value:36},
        {type: '收入', label:'12月', value:52},
        {type: '支出', label:'12月', value:70},
      ];
      // 柱状图
      this.chartData.interval = [
        {type: '收入', label:'1月', value:50},
        {type: '支出', label:'1月', value:10},
        {type: '收入', label:'2月', value:20},
        {type: '支出', label:'2月', value:30},
        {type: '收入', label:'3月', value:36},
        {type: '支出', label:'3月', value:46},
        {type: '收入', label:'4月', value:82},
        {type: '支出', label:'4月', value:20},
        {type: '收入', label:'5月', value:32},
        {type: '支出', label:'5月', value:49},
        {type: '收入', label:'6月', value:48},
        {type: '支出', label:'6月', value:59},
      ];
      // 饼状图
      this.chartData.pie = [
        {type: '1', label:'手机', value:0.60},
        {type: '1', label:'笔记本', value:0.20},
        {type: '1', label:'家具', value:0.16},
        {type: '1', label:'其他', value:0.04},
      ];
    },

  }
});
