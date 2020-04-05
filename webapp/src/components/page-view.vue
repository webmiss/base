<template>
  <div class="page_view_html">
    <!-- header -->
    <div class="page_view_header" :style="{backgroundColor: bgColor, color: color, paddingTop: statusBar.height}">
      <div class="page_view_header_body">
        <!-- Left -->
        <div class="page_view_left">
          <slot name="left"></slot>
        </div>
        <!-- Right -->
        <div class="page_view_right">
          <slot name="right"></slot>
        </div>
        <!-- Title -->
        <div class="page_view_title">
          <slot name="title"></slot>
        </div>
      </div>
    </div>
     <!-- Body -->
    <div v-if="!immersed" :style="{paddingTop:'calc(44px + '+statusBar.height+')',height:'calc(100% - 44px - '+statusBar.height+')'}">
      <slot name="body"></slot>
    </div>
    <div v-else class="page_view_body"><slot name="body"></slot></div>
  </div>
</template>

<style scoped>
.page_view_html{width: 100%; height: 100%;}
.page_view_header{position: fixed; z-index: 999; width: 100%;}
.page_view_header_body{padding: 5px 10px;}
.page_view_header_body,.page_view_left,.page_view_right{overflow: hidden; height: 34px; line-height: 34px;}
.page_view_title{height: 100%; font-size: 16px; text-align: center;}
.page_view_left{position: absolute; left: 10px; z-index: 99;}
.page_view_right{position: absolute; right: 10px; z-index: 99;}
.page_view_left .icons,.page_view_right .icons{display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center;}
.page_view_left .icons{margin-right: 5px;}
.page_view_right .icons{margin-left: 5px;}
.page_view_body{height: 100%;}
</style>

<script>
import Env from '@/env'
export default {
  name: 'PageView',
  props: {
    immersed: {type: Boolean, default: false},
    color: {type: String, default: Env.statusBar.color},
    bgColor: {type: String, default: Env.statusBar.bgColor},
  },
  data(){
    return {
      statusBar: Env.statusBar,
    }
  },
  mounted(){
  },
  methods:{}
}
</script>
