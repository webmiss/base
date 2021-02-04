<template>
  <div class="wm-form_title" :style="{fontSize: fontSize,}">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-form_title{line-height: 40px; font-weight: 500; color: #666;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FormTitle',
  props: {
    fontSize: {type: String, default: '15px'},
  },
});
</script>