<template>
  <div @touchstart="start" @touchmove="move" @touchend="end">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Touch',
  props: {
    limit: {type: Number, default: 200},  //触发距离
  },
  data(){
    const startPage: any = {x:0,y:0};
    const movePage: any = {x:0,y:0};
    return {startPage,movePage}
  },
  mounted(){
  },
  methods:{

    /* 开始 */
    start(e: any){
      let touch = e.touches?e.touches[0]:e;
      this.startPage = {x:touch.clientX,y:touch.clientY};
      this.movePage = {x:0,y:0};
    },
    
    /* 移动 */
    move(e: any){
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: touch.clientX-this.startPage.x,
        y: touch.clientY-this.startPage.y,
      }
    },
    
    /* 结束 */
    end(e: any){
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
});
</script>
