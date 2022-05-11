<template>
  <input
    ref="input"
    class="wm-input"
    :value="value"
    :type="type"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :style="{
      width: width,
      maxWidth: maxWidth,
      height: height,
      lineHeight: lineHeight,
      padding: padding,
      textAlign: align,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
    }"
    @input="$emit('update:value', $event.target.value)"
    @mouseover="inputStyle('over')"
    @mouseout="inputStyle('out')"
  />
</template>

<style lang="less" scoped>
.wm-input{border: none; background: none; -webkit-appearance: none; outline: none; font: 400 14px Arial; caret-color: @Primary;}
.wm-input{box-sizing: border-box; border-radius: 4px; border: transparent 1px solid; background-color: #FFF;}
.wm-input:hover{box-shadow: 0 0 4px rgba(0,0,0,.1);}
.wm-input:focus{outline: none;}
</style>

<script lang="ts">
import Env from '../../../env'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Input',
  props: {
    value: {default: ''},                             //值
    type: {type: String, default: 'text'},            //类型: input属性
    maxlength: {type: String, default: ''},           //最大字符: 默认
    placeholder: {type: String, default: '请输入'},   //提示: 无
    width: {type: String, default: '100%'},           //宽度: '100%'
    maxWidth: {type: String, default: 'auto'},        //宽度: '100%'
    height: {type: String, default: '40px'},          //高度: '40px'
    lineHeight: {type: String, default: '20px'},      //行高: '20px'
    padding: {type: String, default: '10px 16px'},    //间距: '10px 16px'
    align: {type: String, default: ''},               //文本对齐方式: 'left'
    borderRadius: {type: String, default: '4px'},     //边框圆角: '4px'
    backgroundColor: {type: String, default: '#FFF'}, //背景色: '#FFF'
  },
  mounted(){
    // 初始化
    this.inputStyle();
  },
  methods:{

    /* 样式 */
    inputStyle(type: string='out'){
      const obj: any = this.$refs.input;
      if(type=='over'){
        obj.style.borderColor = Env.themes.primary.plain[0];
      }else if(type=='out'){
        obj.style.borderColor = Env.themes.border.plain[0];
      }
    },

  }
});
</script>