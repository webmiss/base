<template>
  <div
    class="wm-main wm-main_y"
    :style="{width:'calc(100% - '+padding*2+'px)', height:'calc(100% - '+padding*2+'px)', padding:padding+'px'}"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-main{overflow: auto;}
/* 滚动条 */
.wm-main_y::-webkit-scrollbar{width: 8px;}
.wm-main_y::-webkit-scrollbar-thumb{border-radius: 4px; background: transparent;}
.wm-main_y:hover::-webkit-scrollbar-thumb{background: rgba(136,136,136,0.4);}
.wm-main_y:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.1);}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Main',
  props: {
    padding: {type: Number, default: 16}, //边距
  },
});
</script>