<template>
<div class="wm-swipe">
  <div class="wm-swipe_wrapper" ref="Swiper">
    <div class="wm-swipe_content" :style="{whiteSpace: direction=='horizontal'?'nowrap':''}">
      <slot></slot>
    </div>
  </div>
  <div v-if="isPage" class="wm-swipe_dots" :class="direction=='horizontal'?'dotX':'dotY'">
    <div
      v-for="n in total"
      :key="n"
      :class="(n-1)==pageIndex?'active':''"
      :style="{backgroundColor: (n-1)==pageIndex?pageColorActive:pageColor}"
    ></div>
  </div>
</div>
</template>

<style scoped>
.wm-swipe{position: relative;}
.wm-swipe_wrapper{overflow: hidden; height: inherit;}
.wm-swipe_content{height: inherit;}
.wm-swipe_dots{position: absolute;}
.wm-swipe_dots div{width: 8px; height: 8px; border-radius: 50%; background-color: #FFF;}
.wm-swipe_dots .active{border-radius: 4px;}
.wm-swipe_dots.dotX{bottom: 4px; left: 50%; transform: translateX(-50%);}
.wm-swipe_dots.dotX div{display: inline-block; margin: 0 4px;}
.wm-swipe_dots.dotX .active{width: 16px;}
.wm-swipe_dots.dotY{right: 4px; top: 50%; transform: translateY(-50%);}
.wm-swipe_dots.dotY div{margin: 4px 0;}
.wm-swipe_dots.dotY .active{height: 16px;}
</style>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

export default {
  name: 'Swiper',
  props: {
    direction: {type: String, default: 'horizontal'},  //方向: horizontal、vertical
    slide: {type: Object, default: {
      loop: true, //是否循环
      autoplay: true, //自动切换
      interval: 3000,  //播放间隔
      speed: 400, //动画时长
    }},
    isPage: {type: Boolean, default: true},  //显示分页
    pageColor: {type: String, default: 'rgba(0,0,0,.2)'},  //分页颜色
    pageColorActive: {type: String, default: '#6FB737'},  //激活颜色
  },
  data(){
    return {
      bscroll: null,
      total: 0,
      pageIndex: 0,
    }
  },
  mounted(){
    // 初始化
    this.init();
    // 总数
    this.getNum();
  },
  beforeUnmount(){
    this.bscroll.destroy();
  },
  methods:{

    /* 初始化 */
    init(){
      // 配置
      this.bscroll = new BScroll(this.$refs.Swiper, {
        click: true,
        tap: true,
        slide: this.slide,
        momentum: false,
        bounce: false,
        probeType: 3,
        scrollX: this.direction=='horizontal'?true:false,
        scrollY: this.direction=='vertical'?true:false,
      });
      // 切换事项
      this.bscroll.on('slidePageChanged', (page) => {
        this.pageIndex = this.direction=='horizontal'?page.pageX:page.pageY;
      });
    },

    /* 获取总数 */
    getNum(){
      this.total = this.$refs.Swiper.querySelectorAll('.wm-swipe_item').length;
      if(this.slide.loop) this.total -= 2;
    },

    /* 上一页 */
    prePage(){
      this.bscroll.next();
    },

    /* 下一页 */
    nextPage(){
      this.bscroll.prev();
    },

    /* 跳转 */
    goToPage(x,y,time){
      time = time || 400;
      this.bscroll.goToPage(x,y,time);
    },

  }
}
</script>
