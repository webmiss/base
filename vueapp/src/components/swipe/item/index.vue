<template>
<div class="wm-swipe_item">
  <slot></slot>
</div>
</template>

<style scoped>
.wm-swipe_item{display: inline-block; width: 100%; height: 100%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SwipeItem',
});
</script>