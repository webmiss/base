<template>
  <canvas ref="chart" :style="{width: '100%', height: '100%'}"></canvas>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import F2 from '@antv/f2';
export default defineComponent({
  name: 'ChartPie',
  props: {
    type: {type: String, default: 'stack'},  //类型: dodge、stack
    data: {type: Array, default: []},  //数据
    size: {type: Number, default: 100},  //大小
    position: {type: String, default: 'right'},  //位置: top、bootom、left、right
    html: {type: String, default: '<div style="text-align: center;"><p>积分</p><h2>888</h2></div>'},  //中部内容
    htmlPosition: {type: Array, default: ['50%', '50%']},  //数据
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
      // 对象
      const config: any = {id: this.$refs.chart, pixelRatio: window.devicePixelRatio};
      if(!this.chart) this.chart = new F2.Chart(config);
      // 数据
      this.chart.clear();
      this.chart.source(this.data);
      // 显示
      this.chart.tooltip(false);
      this.chart.legend({position: this.position});
      this.chart.coord('polar', {transposed: true, radius: 0.3});
      // 创建
      this.chart.axis(false);
      this.chart.interval().position('type*value').color('label').size(this.size).adjust(this.type).style({lineWidth: 1, stroke: '#fff'});
      if(this.html) this.chart.guide().html({
        position: this.htmlPosition,
        html: this.html,
      });
      this.chart.render();
    },

  }
});
</script>