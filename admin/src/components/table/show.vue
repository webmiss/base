<template>
  <table
    class="wm-table_info"
    :style="{margin:margin, backgroundColor:bgColor}"
  >
    <slot></slot>
  </table>
</template>

<style>
.wm-table_info{width: 100%; border-collapse: collapse; border-radius: 4px; background-color: #F2F4F8;}
.wm-table_info .title{font-size: 14px; font-weight: bold; text-indent: 4px;}
.wm-table_info td{position: relative; padding: 4px 8px; line-height: 28px; border: #FFF 1px solid;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Table',
  components: {},
  props: {
    margin: {type: String, default: '4px 0'},       //外部间距
    bgColor: {type: String, default: '#F2F4F8'},    //显示标题
  },
  methods:{
  },
});
</script>