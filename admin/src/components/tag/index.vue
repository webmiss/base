<template>
  <div ref="Tag" class="wm-tag">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-tag{display: inline-block; border-radius: 4px; border: transparent 1px solid; background-color: #FFF; box-sizing: border-box;}
</style>

<script lang="ts">
import Env from '../../env'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tag',
  props: {
    type: {type: String, default: 'primary'},   //类型: primary、info、warning、danger
    effect: {type: String, default: 'plain'},   //样式: plain、dark
    height: {type: String, default: '28px'},    //高度
    padding: {type: String, default: '0 8px'},  //间距
    fontSize: {type: String, default: '12px'},  //字体大小
  },
  data(){
    const color: any = {
        primary: Env.themes.primary,
        success: Env.themes.success,
        warning: Env.themes.warning,
        danger: Env.themes.danger,
        info: Env.themes.info,
      };
    return {color}
  },
  mounted(){
    const obj: any = this.$refs.Tag;
    const color = this.color[this.type][this.effect];
    // 颜色
    obj.style.borderColor = color[1];
    obj.style.backgroundColor = color[2];
    obj.style.color = color[0];
    // 大小
    obj.style.height = this.height;
    obj.style.lineHeight = this.height;
    obj.style.padding = this.padding;
    obj.style.fontSize = this.fontSize;
  },
});
</script>