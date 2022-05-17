<template>
<div ref="Scroll" class="wm-scroll_wrapper">
  <div :class="scrollX?'wm-scroll_content_x':'wm-scroll_content_y'">
    <!-- 下拉动画 -->
    <div v-if="isUpper" class="wm-scroll_load_down" :style="{height: loading+'px',lineHeight: loading+'px',top: '-'+loading+'px',color: upperColor}">
      <wm-loading v-show="isPullDown" class="wm-scroll_loading" :theme="loadingTheme" :color="loadingColor"></wm-loading>
      <span v-show="!isPullDown">{{upperText}}</span>
    </div>
    <!-- 内容 -->
    <slot></slot>
    <!-- 上拉动画 -->
    <div v-show="isLower && isPullUp" class="wm-scroll_load_up" :style="{height: loading+'px',lineHeight: loading+'px',color: lowerColor}">
      {{lowerText}}
    </div>
  </div>
</div>
</template>

<style scoped>
.wm-scroll_wrapper{overflow: hidden;}
.wm-scroll_content_x{position: relative; display: inline-block; min-width: 100%; height: 100%; white-space: nowrap;}
.wm-scroll_content_y{width: inherit; min-height: 100%;}
.wm-scroll_loading{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
.wm-scroll_load_down{position: absolute; width: 100%; text-align: center;}
.wm-scroll_load_up{text-align: center;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

import Env from '../../env'
import wmLoading from '../loading/index.vue'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(PullDown).use(Pullup).use(ObserveDOM).use(ObserveImage).use(ScrollBar).use(MouseWheel);

export default defineComponent({
  name: 'ScrollView',
  components: {wmLoading},
  props: {
    probeType: {type: Number, default: 3},                                  //派发Scroll事件: 0不派发、1间隔(手指)、2一直派发(手指)、3全部派发
    scrollX: {type: Boolean, default: false},                               //滚动-横向
    scrollY: {type: Boolean, default: true},                                //滚动-纵向
    startX: {type: Number, default: 0},                                     //初始化位置-横轴
    startY: {type: Number, default: 0},                                     //初始化位置-纵轴
    loading: {type: Number, default: 48},                                   //Loading高度
    loadingTheme: {type: String, default: 'flow'},                          //Loading样式: flow、swing、circle、wave
    loadingColor: {type: String, default: Env.themes.primary.plain[0]},     //Loading颜色
    upper: {type: Number, default: 64},                                     //顶部距离
    lower: {type: Number, default: 80},                                     //底部距离
    upperText: {type: String, default: '已刷新'},                           //刷新文本
    lowerText: {type: String, default: '正在加载'},                         //加载文本
    upperColor: {type: String, default: Env.themes.text.plain[2]},          //刷新颜色
    lowerColor: {type: String, default: Env.themes.text.plain[2]},          //加载颜色
    isUpper: {type: Boolean, default: true},                                //是否下拉
    isLower: {type: Boolean, default: true},                                //是否上拉
    scrollbar: {type: Object, default: {fade: false, interactive: true}},   //滚动条
    preventDefault: {type: Boolean, default: true},                         //允许浏览器复制
  },
  data(){
    const bscroll: any = null;
    const isPullDown: boolean = true;
    const isPullUp: boolean = false;
    const result: any = {x:0,y:0};
    return {bscroll, isPullDown, isPullUp, result,};
  },
  mounted(){
    // 初始化
    this.init();
  },
  beforeUnmount(){
    (this.bscroll as any).destroy();
  },
  methods:{

    /* 初始化 */
    init(){
      // 配置
      const config: object = {
        click: true,
        tap: true,
        mouseWheel: true,
        probeType: this.probeType,
        preventDefault: this.preventDefault,
        observeDOM: true,
        observeImage: true,
        pullDownRefresh: this.isUpper?{
          threshold: this.upper,
          stop: this.loading,
        }:false,
        pullUpLoad: this.isLower?{
          threshold: this.lower,
        }:false,
        scrollbar: this.scrollbar,
        startX: this.startX,
        startY: this.startY,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
      }
      let obj: any = this.$refs.Scroll;
      this.bscroll = new BScroll(obj, config);
      // 下拉
      if(this.isUpper) this.bscroll.on('pullingDown', this.pullingDown);
      // 上拉
      if(this.isLower) this.bscroll.on('pullingUp', this.pullingUp);
      // 滚动
      this.bscroll.on('scroll', this.scroll);
    },

    /* 下拉 */
    pullingDown(){
      this.$emit('down',this.result);
    },
    /* 下拉-完成 */
    pullDownFinish(){
      this.isPullDown = false;
      this.bscroll.finishPullDown();
      this.refresh();
      setTimeout(()=>{
        this.isPullDown = true;
      },400);
    },

    /* 上拉 */
    pullingUp(){
      this.isPullUp = true;
      this.refresh();
      this.$emit('up',this.result);
    },
    /* 上拉-完成 */
    pullUpFinish(){
      this.isPullUp = false;
      this.bscroll.finishPullUp();
      this.refresh();
    },

    /* 滚动 */
    scroll(res: any){
      this.result.x = res.x;
      this.result.y = -res.y;
      this.$emit('scroll',this.result);
    },

    /* 刷新 */
    refresh(){
      this.$nextTick(() => {
        this.bscroll.refresh();
      })
    },

    /* 位置 */
    scrollTo(x: number=0, y: number=0, time?: number){
      this.bscroll.scrollTo(x,y,time);
    },

  }
});
</script>