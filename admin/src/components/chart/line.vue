<template>
  <div ref="chart" class="chart"></div>
</template>

<style scoped>
.chart{position: relative;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Chart } from '@antv/g2';
export default defineComponent({
  name: 'ChartLine',
  props: {
    data: {type: Array, default: []},         //数据: [{type:'t1',label:'1月',value:1},{type:'t2',label:'1月',value:2}]
    height: {type: Number, default: 240},     //高
    unit: {type: String, default: ''},        //单位
    lunit: {type: String, default: ''},       //单位(左)
    isDot: {type: Boolean, default: true},    //是否显示点
    isSmooth: {type: Boolean, default: true}, //是否曲线
  },
  data(){
    const chart: any = null;
    return {chart}
  },
  watch:{
    data(val){
      if(val) setTimeout(()=>{ this.init(); }, 300);
    }
  },
  mounted(){
    
  },
  methods:{

    /* 初始化 */
    init(){
      // 对象
      const body: any = this.$refs.chart;
      if(!this.chart) this.chart = new Chart({
        container: body,
        autoFit: true,
        height: this.height,
      });
      // 数据
      this.chart.clear();
      this.chart.data(this.data);
      let line = this.chart.line().position('label*value').tooltip('label*value', (label: any, value: any)=>{
        value = value + this.unit;
        return {name: label, value: value};
      }).color('type');
      // 曲线
      if(this.isSmooth) line.shape('smooth');
      // 点
      if(this.isDot) this.chart.point().position('label*value').color('type').shape('circle').style({stroke: '#fff', lineWidth: 1});
      // 单位(左侧)
      this.chart.axis('value', {
        label: {
          formatter: (val: any) => { return val+this.lunit; },
        },
      });
      this.chart.render();
    },

  }
});
</script>