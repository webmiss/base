import { defineComponent } from 'vue';
import Env from '@/env'
import Back from '@/library/ui/ui-back'
import Toast from '@/library/ui/ui-toast'
import NavigateTo from '@/library/ui/ui-navigate-to'
import LoadHtml from '@/library/inc/html-load'
/* 组件 */
import wmTouch from '@/components/touch/index.vue'
import wmPageView from '@/components/page-view/index.vue'
import wmScrollView from '@/components/scroll-view/index.vue'
import wmSwipe from '@/components/swipe/index.vue'
import wmSwipeItem from '@/components/swipe/item/index.vue'
import wmPicker from '@/components/picker/index.vue'
import wmPickerDate from '@/components/picker/date.vue'
/* 图表 */
import wmChartLine from '@/components/chart/line.vue'
import wmChartInterval from '@/components/chart/interval.vue'
import wmChartPie from '@/components/chart/pie.vue'

export default defineComponent({
  components: {
    wmTouch,wmPageView,wmScrollView,wmSwipe,wmSwipeItem,wmPicker,wmPickerDate,
    wmChartLine,wmChartInterval,wmChartPie
  },
  data(){
    const city: any = {show: false, data: []};
    const date: any = {show: false};
    const chartData: any = {line: [], interval:[]};
    const lists: any = [];
    return {city,date,chartData,lists}
  },
  computed:{
  },
  mounted(){
    // 高德地图
    LoadHtml(['https://webapi.amap.com/maps?v=1.4.15&key=$key&plugin=AMap.Riding'],true,'js');
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
    // 折线图
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
    // 城市区域
    this.city.data = [
      {label: '云南',value: 'yn', children:[
        {label: '昆明市',value: 'km', children:[
          {label: '五华区',value: 'wh'},
          {label: '西山区',value: 'xs'},
        ]},
        {label: '玉溪市',value: 'yx', children:[
          {label: '红塔区',value: 'ht'},
          {label: '江川区',value: 'jc'},
          {label: '通海县',value: 'th'},
          {label: '华宁县',value: 'hn'},
        ]}
      ]},
      {label: '深圳',value: 'sz', children:[
        {label: '南山区',value: 'ns', children:[
          {label: '四海公园',value: 'shgy'},
          {label: '中山公园',value: 'zsgy'},
          {label: '荔香公园',value: 'lxgy'},
        ]},
        {label: '福田区',value: 'ft', children:[
          {label: '中心公园',value: 'zxgy'},
          {label: '荔枝公园',value: 'lzgy'},
        ]},
      ]},
    ];
    // 列表
    this.lists = this._getData(3);
    (this.$refs.DemoScroll as any).refresh();
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

    /* 返回 */
    back(res: any){
      if(res=='left') return Back(1);
    },

    /* 下拉刷新 */
    reFresh(res: any){
      console.log('刷新',res);
      setTimeout(()=>{
        this.lists = this._getData(6);
        (this.$refs.DemoScroll as any).pullDownFinish();
      },3000);
    },

    /* 上拉加载 */
    upLoad(d: any){
      console.log('加载',d);
      setTimeout(()=>{
        let data = this._getData(10);
        for(let i in data) this.lists.push(data[i]);
        (this.$refs.DemoScroll as any).pullUpFinish();
      },3000);
    },

    /* 滚动 */
    scroll(res: any){
      // console.log(res);
    },

    /* 数据 */
    _getData(n: number){
      let data = [];
      for(let i=0; i<n; i++) data.push({name:'Test'+(i+1)});
      return data;
    },

    /* 选择区域 */
    cityConfirm(res: any){
      let html = '';
      for(let i in res.data) html += res.data[i].label+' > ';
      Toast(html);
    },

    /* 选择日期 */
    dateConfirm(res: any){
      let html = '';
      for(let i in res.data) html += res.data[i].label+' ';
      Toast(html);
    }

  }
});