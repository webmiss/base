<template>
  <div ref="chart" class="chart_pie">
    <div class="chart_pie_html" v-if="isHtml" v-html="html"></div>
  </div>
</template>

<style scoped>
.chart_pie{position: relative;}
.chart_pie_html{position: absolute; left: 50%; top: 50%; transform: translate(-50%, calc(-50% - 15px));}
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
    html: {type: String, default: ''},            //中部内容
  },
  data(){
    const chart: any = null;
    const isHtml: any = false;
    return {chart, isHtml}
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
        const config: any = {container: this.$refs.chart, width: this.width, height: this.height};
        this.chart = new G2.Chart(config);
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
      }
      // 数据
      this.chart.data(this.data);
      // 加载
      this.chart.render();
      // 显示Html
      setTimeout(()=>{ this.isHtml=true; },1000);
    },

  }
});
</script>