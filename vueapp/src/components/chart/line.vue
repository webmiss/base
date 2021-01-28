<template>
  <canvas ref="chart" :style="{width: '100%', height: '100%'}"></canvas>
</template>

<style scoped>
</style>

<script>
const F2 = require('@antv/f2');
export default {
  name: 'ChartLine',
  props: {
    data: {type: Array, default: []},  //数据
    unit: {type: String, default: ''},  //单位
    isDot: {type: Boolean, default: true},  //是否显示点
    isSmooth: {type: Boolean, default: true},  //是否曲线
  },
  data(){
    return {
      chart: null,
    }
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
      // 对象
      if(!this.chart) this.chart = new F2.Chart({id: this.$refs.chart, pixelRatio: window.devicePixelRatio});
      // 数据
      this.chart.clear();
      this.chart.source(this.data);
      // 显示
      this.chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: (ev)=>{
          const items = ev.items;
          for(let i in items) items[i].value = items[i].value+this.unit;
        },
      });
      // 点
      if(this.isDot) this.chart.point().position('label*value').style({stroke: '#fff', lineWidth: 1});
      // 创建
      if(this.isSmooth) this.chart.line().position('label*value').shape('smooth').color('type');
      else this.chart.line().position('label*value').color('type');
      this.chart.render();
    },

  }
}
</script>