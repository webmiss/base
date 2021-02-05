<template>
  <div ref="Tag" class="wm-tag">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-tag{display: inline-block; border-radius: 4px; border: #DCDFE6 1px solid; background-color: #FFF;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tag',
  props: {
    type: {type: String, default: 'primary'}, //类型: primary、info、warning、danger
    effect: {type: String, default: 'plain'}, //样式: plain、dark
    height: {type: String, default: '30px'}, //高度
    padding: {type: String, default: '0 8px'}, //间距
    fontSize: {type: String, default: '14px'}, //字体大小
  },
  data(){
    const color: any = {
        primary:{
          plain:['#C2E7B0','#F0F9EB','#6FB737'],
          dark:['#595','#6FB737','#FFF'],
        },
        info:{
          plain:['#DCDFE6','#F4F6F8','#909399'],
          dark:['#909399','#909399','#FFF'],
        },
        warning:{
          plain:['#F5DAB1','#FDF6EC','#E6A23C'],
          dark:['#E6A23C','#E6A23C','#FFF'],
        },
        danger:{
          plain:['#FBC4C4','#FEF0F0','#F56C6C'],
          dark:['#F56C6C','#F56C6C','#FFF'],
        },
      };
    return {color}
  },
  mounted(){
    const obj: any = this.$refs.Tag;
    const color = this.color[this.type][this.effect];
    // 颜色
    obj.style.borderColor = color[0];
    obj.style.backgroundColor = color[1];
    obj.style.color = color[2];
    // 大小
    obj.style.height = this.height;
    obj.style.lineHeight = this.height;
    obj.style.padding = this.padding;
    obj.style.fontSize = this.fontSize;
  },
});
</script>