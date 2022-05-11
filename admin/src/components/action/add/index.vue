<template>
  <span class="wm-action_add" :style="{padding:size, backgroundColor:bgColor}"></span>
</template>

<style scoped>
.wm-action_add{cursor: pointer; position: relative; display: inline-block; width: 0; height: 0; border-radius: 50%; margin: 0 5px; opacity: 0.8;}
.wm-action_add:hover{opacity: 1;}
.wm-action_add::after,.wm-action_add::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-action_add::after{transform: translate(-50%, -50%) rotate(90deg);}
.wm-action_add::before{transform: translate(-50%, -50%) rotate(180deg);}
</style>

<script lang="ts">
import Env from '../../../env'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActionAdd',
  props: {
    size: {type: String, default: '11px'},        //大小
    bgColor: {type: String, default: Env.themes.primary.plain[0]},  //背景颜色
  },
});
</script>