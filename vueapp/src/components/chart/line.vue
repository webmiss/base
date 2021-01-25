<template>
  <canvas ref="chartObj" :style="{width: '100%', height: '100%'}"></canvas>
</template>

<style scoped>
</style>

<script>
const F2 = require('@antv/f2');
export default {
  name: 'ChartLine',
  props: {
    data: {type: Array, default: []},  //数据
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
      if(!this.chart){
        this.chart = new F2.Chart({
          id: this.$refs.chartObj,
          pixelRatio: window.devicePixelRatio,
        });
      }
      // 数据
      this.chart.source(this.data);
      this.chart.line().position('label*value').color('type');
      this.chart.render();
    },

  }
}
</script>