<template>
  <div class="wm-row" :style="{lineHeight:lineHeight,fontSize:fontSize}">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-row{position: relative;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Row',
  props: {
    lineHeight: {type: String, default: '40px'},  //高
    fontSize: {type: String, default: '14px'},    //字体大小
  },
});
</script>