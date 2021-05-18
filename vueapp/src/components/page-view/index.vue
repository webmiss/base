<template>
  <div class="page_view_html">
    <!-- header -->
    <div class="page_view_header" v-if="header" :style="{height:(height-10)+'px', lineHeight:(height-10)+'px', paddingTop:(state.statusHeight+5)+'px', paddingBottom:'5px', backgroundColor:bgColor, color:color}">
      <!-- Left -->
      <div class="page_view_left flex center">
        <slot name="left"></slot>
      </div>
      <!-- Right -->
      <div class="page_view_right flex center">
        <slot name="right"></slot>
      </div>
      <!-- Title -->
      <div class="page_view_title">
        <slot name="title"></slot>
      </div>
    </div>
     <!-- Body -->
    <div v-if="!immersed" :style="{paddingTop:(height+state.statusHeight)+'px',height:'calc(100% - '+(height+state.statusHeight)+'px)'}">
      <slot name="body"></slot>
    </div>
    <div v-else class="page_view_body"><slot name="body"></slot></div>
  </div>
</template>

<style scoped>
.page_view_html{width: 100%; height: 100%;}
.page_view_header{user-select: none; position: fixed; z-index: 999; width: 100%;}
.page_view_title{height: 100%; font-size: 16px; text-align: center;}
.page_view_left{position: absolute; left: 16px; font-size: 14px;}
.page_view_right{position: absolute; right: 16px;}
.page_view_body{height: 100%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from '../../env'
export default defineComponent({
  name: 'PageView',
  props: {
    immersed: {type: Boolean, default: false},                //沉浸式
    header: {type: Boolean, default: true},                   //隐藏头部
    color: {type: String, default: Env.statusBar.color},      //文本颜色
    bgColor: {type: String, default: Env.statusBar.bgColor},  //背景颜色
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 高度
    const height: number = Env.statusBar.height;
    return { state,height };
  },
});
</script>
