<template>
  <span class="wm-action_add" :style="{padding:size, backgroundColor:bgColor}"></span>
</template>

<style scoped>
.wm-action_add{cursor: pointer; position: relative; display: inline-block; width: 0; height: 0; border-radius: 50%; margin: 0 5px; opacity: 0.8;}
.wm-action_add:hover{opacity: 1;}
.wm-action_add::after,.wm-action_add::before{content: ''; position: absolute; width: 60%; height: 0.12rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-action_add::after{transform: rotate(90deg); margin-left: -30%;}
.wm-action_add::before{transform: rotate(180deg); margin-left: -30%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActionAdd',
  props: {
    size: {type: String, default: '11px'},        //大小
    bgColor: {type: String, default: '#6FB737'},  //背景颜色
  },
});
</script>