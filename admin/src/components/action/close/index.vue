<template>
  <span class="wm-action_close" :style="{padding:size, backgroundColor:bgColor}"></span>
</template>

<style scoped>
.wm-action_close{cursor: pointer; position: relative; display: inline-block; width: 0; height: 0; border-radius: 50%; margin: 0 5px; opacity: 0.8;}
.wm-action_close:hover{opacity: 1;}
.wm-action_close::after,.wm-action_close::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-action_close::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-action_close::before{transform: translate(-50%, -50%) rotate(-45deg);}
</style>

<script lang="ts">
import Env from '../../../env'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActionClose',
  props: {
    size: {type: String, default: '9px'},        //大小
    bgColor: {type: String, default: Env.themes.danger.plain[0]},  //背景颜色
  },
});
</script>