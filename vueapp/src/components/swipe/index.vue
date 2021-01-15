<template>
<div class="swiper-container" ref="Swiper">
  <div class="swiper-wrapper">
    <slot></slot>
  </div>
  <div v-if="isPage" class="wm-swiper_pagination flex_center">
    <span v-for="(val,index) in pageList" :key="index" :style="{backgroundColor:val.cleck?pageColorActive:pageColor}"></span>
  </div>
</div>
</template>

<style scoped>
.swiper-container{position: relative; overflow: hidden; height: 100px;}
.swiper-wrapper{width: 100%; height: 100%;}
.wm-swiper_pagination{position: absolute; z-index: 1000; height: 10px; white-space: nowrap; bottom: 8px; left: 0; right: 0;}
.wm-swiper_pagination span{display: inline-block; width: 8px; height: 8px; margin: 0 4px; border-radius: 50%;}
</style>

<script>
/* Swiper */
import Swiper from '@/library/ui/swiper-bundle.min.js'
import '@/library/ui/swiper-bundle.min.css'
export default {
  name: 'Swiper',
  props: {
    direction: {type: String, default: 'horizontal'},  //方向:horizontal、vertical
    loop: {type: Boolean, default: true},  //是否循环
    autoplay: {type: Object, default: {delay: 3000, stopOnLastSlide: false, disableOnInteraction: false}},  //自动切换
    isPage: {type: Boolean, default: true},  //显示分页
    pageColor: {type: String, default: 'rgba(0,0,0,.5)'},  //分页颜色
    pageColorActive: {type: String, default: '#FF6600'},  //分页颜色
  },
  data(){
    return {
      obj: null,
      total: 0,
      pageList: [],
    }
  },
  mounted(){
    // 初始化
    this.init();
    // 对象、总数、分页
    this.obj = this.$refs.Swiper;
    this.total = this.obj.querySelectorAll('.swiper-slide').length;
    for(let i=0; i<this.total; i++) this.pageList.push({cleck:false});
  },
  methods:{

    /* 初始化 */
    init(){
      setTimeout(()=>{
        const swiper = new Swiper('.swiper-container', {
          direction: this.direction,
          loop: this.loop,
          autoplay: this.autoplay,
          on: {
            slideChange: (res)=>{
              this.page(res.activeIndex);
            }
          },
        });
      },300);
    },

    /* 分页 */
    page(index){
      index = index>this.total || index<1?1:index;
      const n = index-1;
      for(let i in this.pageList) this.pageList[i].cleck=false;
      this.pageList[n].cleck=true;
    },

  }
}
</script>
