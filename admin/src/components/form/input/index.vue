<template>
  <div>
    <input
      class="wm-input"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :style="{
        width: width,
        maxWidth: maxWidth,
        height: height,
        lineHeight: lineHeight,
        padding: padding,
        textAlign: align
      }"
    >
  </div>
</template>

<style scoped>
.wm-input{border: none; background: none; -webkit-appearance: none; outline: none; font: 400 14px Arial; caret-color: #595;}
.wm-input{box-sizing: border-box; border-radius: 4px; border: #DCDFE6 1px solid; background-color: #F6F8FA;}
.wm-input:hover{border: #6FB737 1px solid;}
.wm-input:focus{outline: none;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Input',
  props: {
    value: {default: ''},                           //值
    type: {type: String, default: 'text'},          //类型: input属性
    maxlength: {type: String, default: ''},         //最大字符: 默认
    placeholder: {type: String, default: ''},       //提示: 无
    width: {type: String, default: '100%'},         //宽度: '100%'
    maxWidth: {type: String, default: 'auto'},      //宽度: '100%'
    height: {type: String, default: '40px'},        //高度: '40px'
    lineHeight: {type: String, default: '20px'},    //行高: '20px'
    padding: {type: String, default: '10px 16px'},  //间距: '10px 16px'
    align: {type: String, default: ''},             //文本对齐方式: 'left'
  },
});
</script>