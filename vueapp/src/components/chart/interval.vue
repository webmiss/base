<template>
  <canvas ref="chart" :style="{width: '100%', height: '100%'}"></canvas>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import F2 from '@antv/f2';
export default defineComponent({
  name: 'ChartInterval',
  props: {
    type: {type: String, default: 'dodge'},  //类型: dodge、stack
    data: {type: Array, default: []},  //数据
    unit: {type: String, default: ''},  //单位
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
      this.chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: (ev: any)=>{
          const items = ev.items;
          for(let i in items) items[i].value = items[i].value+this.unit;
        },
      });
      // 创建
      this.chart.interval().position('label*value').color('type').adjust({
        type: this.type,
        marginRatio: 0.08,
      });
      this.chart.render();
    },

  }
});
</script>