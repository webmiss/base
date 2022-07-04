<template>
  <div
    class="wm-main"
    :style="{width:'calc(100% - '+padding*2+'px)', height:'calc(100% - '+padding*2+'px)', padding:padding+'px'}"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-main{position: relative; overflow: auto;}
.wm-main::-webkit-scrollbar{width: 8px; height: 8px;}
.wm-main::-webkit-scrollbar-thumb{border-radius: 4px; background: transparent;}
.wm-main:hover::-webkit-scrollbar-thumb{background: rgba(136,136,136,0.8);}
.wm-main:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.2);}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Main',
  props: {
    padding: {type: Number, default: 10}, //边距
  },
});
</script>