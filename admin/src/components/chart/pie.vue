<template>
  <div ref="chart"></div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import * as G2 from '@antv/g2'
export default defineComponent({
  name: 'ChartPie',
  props: {
    type: {type: String, default: 'stack'},       //类型: dodge、stack
    data: {type: Array, default: []},             //数据
    width: {type: Number, default: 600},          //宽
    height: {type: Number, default: 240},         //高
    position: {type: String, default: 'bottom'},  //位置: top、bootom、left、right
    html: {type: String, default: '<div style="text-align: center;"><p>积分</p><h2>888</h2></div>'},  //中部内容
    htmlPosition: {type: Array, default: ['46%', '40%']},  //数据
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
      const config: any = {container: this.$refs.chart, width: this.width, height: this.height};
      if(!this.chart) this.chart = new G2.Chart(config);
      // 数据
      this.chart.clear();
      this.chart.data(this.data);
      // 显示
      this.chart.legend({position: this.position});
      this.chart.coord('theta', {radius: 0.75, innerRadius: 0.6});
      // 创建
      this.chart.axis(false);
      this.chart.interval().position('value').color('label').label('percent', {
        formatter: (val: any, item: any)=>{
          return item.point.item + ': ' + val;
        }
      }).tooltip('label*value', (label: any, value: any)=>{
        value = value * 100 + '%';
        return {name: label, value: value};
      }).style({lineWidth: 1, stroke: '#fff'});
      // 中间内容
      if(this.html) this.chart.guide().html({
        position: this.htmlPosition,
        html: this.html,
        alignX: 'middle',
        alignY: 'middle',
      });
      this.chart.render();
    },

  }
});
</script>