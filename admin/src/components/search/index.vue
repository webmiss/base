<template>
  <div class="wm-search">
    <div class="wm-search_title flex">
      <h2 class="color1">搜索</h2>
      <span @click="$emit('update:show', false)"><i class="ui ui_arrow_left"></i></span>
    </div>
    <div class="wm-search_body scrollbar">
      <ul class="wm-search_form">
        <slot></slot>
      </ul>
      <div class="wm-search_button">
        <wm-button @click="$emit('update:submit')" height="32px">搜 索</wm-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.wm-search{position: relative; height: 100%; font-size: 14px;}
.wm-search_title{height: 38px; line-height: 32px; padding: 3px 4px; background-image: linear-gradient(to right, #F1F3F4, #F1F3F4); box-sizing: border-box;}
.wm-search_title h2{font-size: 14px; padding-left: 10px; font-weight: 600;}
.wm-search_title span{cursor: pointer; width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%;}
.wm-search_title span i{font-size: 14px; color: @IconColor;}
.wm-search_title span:hover{background-color: @Hover;}
.wm-search_title span:hover i{color: @Primary;}
.wm-search_body{overflow-y: auto; height: calc(100% - 42px);}
.wm-search_form{padding: 8px 10px;}
.wm-search_form li{padding: 4px 0;}
.wm-search_button{text-align: center; padding-bottom: 16px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmButton from '../form/button/index.vue'
export default defineComponent({
  name:'Search',
  components: {wmButton},
  props: {
    show: {type:Boolean, default:false},    //是否显示
  },
});
</script>