<template>
  <div class="page_view_html" @touchstart="start" @touchmove="move" @touchend="end">
    <!-- header -->
    <div class="page_view_header" v-if="header" :style="{height:(height-10)+'px', lineHeight:(height-10)+'px', paddingTop:($store.state.statusBarHeight+5)+'px', paddingBottom:'5px', backgroundColor:bgColor, color:color}">
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
    <div v-if="!immersed" :style="{paddingTop:(height+$store.state.statusBarHeight)+'px',height:'calc(100% - '+(height+$store.state.statusBarHeight)+'px)'}">
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

<script>
import Env from '@/env'
export default {
  name: 'PageView',
  props: {
    immersed: {type: Boolean, default: false},
    header: {type: Boolean, default: true},
    color: {type: String, default: Env.statusBar.color},
    bgColor: {type: String, default: Env.statusBar.bgColor},
    limit: {type: Number, default: 200},  //触发滑动方向
  },
  data(){
    return {
      height: Env.statusBar.height,
      startPage: {x:0,y:0},
      movePage: {x:0,y:0},
    }
  },
  mounted(){
  },
  methods:{

    /* 开始 */
    start(e){
      let touch = e.touches?e.touches[0]:e;
      this.startPage = {x:touch.clientX,y:touch.clientY};
      this.movePage = {x:0,y:0};
    },
    /* 移动 */
    move(e){
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: touch.clientX-this.startPage.x,
        y: touch.clientY-this.startPage.y,
      }
    },
    /* 结束 */
    end(e){
      // 滑动方向
      const ratio = Math.abs(this.movePage.x/this.movePage.y) || 0;
      if(ratio>1 && this.movePage.x>this.limit){
        this.$emit('swipe','left');
      }else if(ratio>1 && this.movePage.x<-this.limit){
        this.$emit('swipe','right');
      }else if(ratio<1 && this.movePage.y>this.limit){
        this.$emit('swipe','down');
      }else if(ratio<1 && this.movePage.y<-this.limit){
        this.$emit('swipe','up');
      }
    },

  }
}
</script>
