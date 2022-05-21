<template>
  <div
    class="wm-main scrollbar"
    :style="{width:'calc(100% - '+padding*2+'px)', height:'calc(100% - '+padding*2+'px)', padding:padding+'px'}"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-main{position: relative; overflow: auto;}
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