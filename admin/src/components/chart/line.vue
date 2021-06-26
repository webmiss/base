<template>
  <div ref="chart" class="chart"></div>
</template>

<style scoped>
.chart{width: 100%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import * as G2 from '@antv/g2'
export default defineComponent({
  name: 'ChartLine',
  props: {
    data: {type: Array, default: []},         //数据
    width: {type: Number, default: 600},      //宽
    height: {type: Number, default: 240},     //高
    unit: {type: String, default: ''},        //单位
    isDot: {type: Boolean, default: true},    //是否显示点
    isSmooth: {type: Boolean, default: true}, //是否曲线
  },
  data(){
    const chart: any = null;
    return {chart}
  },
  watch:{
    data(val){
      if(val) this.init();
    }
  },
  mounted(){
  },
  methods:{

    /* 初始化 */
    init(){
      const body: any = this.$refs.chart;
      // 对象
      const config: any = {container: body, forceFit: false, width: this.width, height: this.height};
      if(!this.chart) this.chart = new G2.Chart(config);
      // 数据
      this.chart.clear();
      this.chart.data(this.data);
      // 点
      if(this.isDot) this.chart.point().position('label*value').size(4).shape('circle').color('type').style({stroke: '#fff', lineWidth: 1});
      // 创建
      if(this.isSmooth) this.chart.line().position('label*value').tooltip('label*value', (label: any, value: any)=>{
        value = value + this.unit;
        return {name: label, value: value};
      }).shape('smooth').color('type');
      else this.chart.line().position('label*value').tooltip('label*value', (label: any, value: any)=>{
        value = value + this.unit;
        return {name: label, value: value};
      }).color('type');
      this.chart.render();
    },

  }
});
</script>