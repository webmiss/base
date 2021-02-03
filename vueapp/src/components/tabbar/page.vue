<template>
    <div ref="TabbarPage" class="wm-tabbar_page" :style="{height: height, backgroundColor: bgColor}">
      <slot></slot>
    </div>
</template>

<style scoped>
.wm-tabbar_page{position: fixed; width: 100%; top: 0; overflow: hidden; opacity: 0;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TabbarPage',
  props: {
    show: {type: Boolean, default: false}, //显示
    height: {type: String, default: 'calc(100% - 54px)'}, //高度
    bgColor: {type: String, default: '#FFF'},  //背景颜色
    time: {type: Number, default: 400},  //背景颜色
  },
  watch:{
    show(val){
      const obj: any = this.$refs.TabbarPage;
      if(val) obj.style.display = 'block';
      setTimeout(()=>{ this._animation(val); },200);
      
    }
  },
  mounted(){
    this._animation(this.show);
  },
  methods:{

    /* 动画 */
    _animation(val: boolean){
      const obj: any = this.$refs.TabbarPage;
      obj.style.transitionDuration = this.time+'ms';
      if(val){
        obj.style.opacity = 1;
      }else{
        obj.style.opacity = 0;
        obj.style.display = 'none';
      }
    },

  }
});
</script>
