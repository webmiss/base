<template>
  <span class="wm-action_subtract" :style="{padding:size, backgroundColor:bgColor}"></span>
</template>

<style scoped>
.wm-action_subtract{cursor: pointer; position: relative; display: inline-block; width: 0; height: 0; border-radius: 50%; margin: 0 5px; opacity: 0.8;}
.wm-action_subtract:hover{opacity: 1;}
.wm-action_subtract::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-action_subtract::before{transform: translate(-50%, -50%) rotate(180deg);}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActionSubtract',
  props: {
    size: {type: String, default: '9px'},        //大小
    bgColor: {type: String, default: '#6FB737'},  //背景颜色
  },
});
</script>