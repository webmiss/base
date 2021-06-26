<template>
  <div ref="chart"></div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import * as G2 from '@antv/g2'
export default defineComponent({
  name: 'ChartInterval',
  props: {
    type: {type: String, default: 'dodge'}, //类型: dodge、stack
    data: {type: Array, default: []},       //数据
    width: {type: Number, default: 600},    //宽
    height: {type: Number, default: 240},   //高
    unit: {type: String, default: ''},      //单位
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
      // 创建
      this.chart.interval().position('label*value').tooltip('label*value', (label: any, value: any)=>{
        value = value + this.unit;
        return {name: label, value: value};
      }).color('type').adjust({
        type: this.type,
        marginRatio: 0.08,
      });
      this.chart.render();
    },

  }
});
</script>