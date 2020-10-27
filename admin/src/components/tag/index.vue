<template>
  <div ref="Tag" class="wm-tag">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-tag{display: inline-block; padding: 0 8px; border-radius: 4px; border: #DCDFE6 1px solid; background-color: #FFF;}
</style>

<script>
export default {
  name: 'Tag',
  props: {
    type: {type: String, default: 'primary'}, //类型: primary、info、warning、danger
    size: {type: String, default: 'default'}, //尺寸: default、medium、mini
    effect: {type: String, default: 'plain'}, //样式: plain、dark
  },
  data(){
    return {
      color: {
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
      },
    }
  },
  mounted(){
    const style = this.$refs.Tag.style;
    const color = this.color[this.type][this.effect];
    // 颜色
    style.borderColor = color[0];
    style.backgroundColor = color[1];
    style.color = color[2];
    // 大小
    if(this.size=='default'){
       style.height = '30px';
       style.lineHeight = '30px';
       style.fontSize = '14px';
    }else if(this.size=='medium'){
       style.height = '26px';
       style.lineHeight = '26px';
       style.fontSize = '13px';
    }else if(this.size=='mini'){
       style.height = '22px';
       style.lineHeight = '22px';
       style.fontSize = '12px';
    }
  },
}
</script>