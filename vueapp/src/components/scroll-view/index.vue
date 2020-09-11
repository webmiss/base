<template>
<div ref="html" class="wm-scroll_html" :class="scrollX?isMobile?'wm-scroll_x':'wm-scroll_y':!isMobile?'wm-scroll_y':''">
  <!-- 左拉/下拉 -->
  <div ref="upper" v-show="upperLoad" class="wm-scroll_load_body" :style="{backgroundColor:upperBg}">
    <div ref="body" class="wm-scroll_load">
      <i :class="upperIcon" :style="{color:upperColor}"></i>
    </div>
  </div>
  <!-- 滑动内容 -->
  <div ref="body" class="wm-scroll_body" @touchstart="start" @touchmove="move" @touchend="end">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.wm-scroll_html{position: relative; overflow: hidden;}
.wm-scroll_body{position: relative; overflow: hidden; display: block;}
/* 滚动条 */
.wm-scroll_x::-webkit-scrollbar{display:none}
.wm-scroll_y::-webkit-scrollbar{width: 4px;}
.wm-scroll_y::-webkit-scrollbar-thumb{border-radius: 4px; background: transparent;}
.wm-scroll_y:hover::-webkit-scrollbar-thumb{background: rgba(136,136,136,0.4);}
.wm-scroll_y:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.1);}
/* Loading */
.wm-scroll_load_body{position: absolute; overflow: hidden; z-index: 1; opacity: 1;}
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.wm-scroll_load{position: absolute; width: 30px; height: 30px; line-height: 30px; margin: -15px 0 0 -15px; text-align: center; left: 50%; top: 50%; transform: translate(-50%,-50%); animation: loading 2s linear 0s infinite;}
.wm-scroll_load i{font-size: 22px; color: #6FB737;}
</style>

<script>
import IsMobile from '@/library/inc/is-mobile'
export default {
  name: 'ScrollView',
  props: {
    isScroll: {type: Boolean, default: true},
    scrollX: {type: Boolean, default: false},
    scrollY: {type: Boolean, default: true},
    upper: {type: Number, default: 64},
    lowerBoundary: {type: Number, default: 50},
    upperLoad: {type: Boolean, default: true},
    upperIcon: {type: String, default: 'ui ui_loading'},
    upperBg: {type: String, default: ''},
    upperColor: {type: String, default: ''},
  },
  data(){
    return {
      isMobile: true, //是否手机
      sp: 'y', //滑动方向
      html: {w:0,h:0},  //容器
      body: {w:0,h:0,x:0,y:0},  //内容
      limit: 60,  //最小距离
      refUpper: {}, //左上内容
      refHtml: {}, //区域
      refBody: {}, //内容
      cubicBezier: '0.25,0.46,0.45,0.94', //动画
    }
  },
  mounted(){
    /* 是否手机 */
    this.isMobile = IsMobile();
    /* 滑动方向 */
    this.sp = this.scrollX?'x':'y';
    /* 加载动画 */
    this.refUpper = this.$refs.upper;
    /* 对象 */
    this.refHtml = this.$refs.html;
    this.refBody = this.$refs.body;
    /* 默认值 */
     if(this.sp=='x'){
      // 左
      this.refUpper.style.left = 0;
      this.refUpper.style.width = `${this.upper}px`;
      this.refUpper.style.height = '100%';
      this.refUpper.style.transform = `translate(-${this.upper}px,0)`;
      // 中
      this.refHtml.style.overflowX = 'auto';
      this.refBody.style.width = 'fit-content';
      this.refBody.style.height = 'inherit';
    }else{
      // 上
      this.refUpper.style.top = 0;
      this.refUpper.style.width = '100%';
      this.refUpper.style.height = `${this.upper}px`;
      this.refUpper.style.transform = `translate(0,-${this.upper}px)`;
      // 中
      this.refHtml.style.overflowY = 'auto';
      this.refBody.style.width = 'inherit';
      this.refBody.style.height = 'fit-content';
    }
    /* 监听内容变化 */
    this.refHtml.addEventListener('scroll',this.scroll);
  },
  methods:{

    /* 返回 */
    res(){
      return {
        x: this.body.x,
        y: this.body.y,
        w: this.body.w,
        h: this.body.h,
        boxW: this.html.w,
        boxH: this.html.h,
      }
    },

    /* 重置 */
    refresh(){
      // 容器-宽高
      this.html.w = this.refHtml.offsetWidth;
      this.html.h = this.refHtml.offsetHeight;
      // 内容-宽高
      this.body.w = this.refHtml.scrollWidth;
      this.body.h = this.refHtml.scrollHeight;
      // 滑动范围
      this.body.min = 0;
      this.body.max = this.body[this.sp=='x'?'w':'h']-this.html[this.sp=='x'?'w':'h']-50;
    },

    /* 开始 */
    start(e){
      let touch = e.touches?e.touches[0]:e;
      this.movePage = {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage = {x:touch.clientX,y:touch.clientY};
      // 控制事件
      this.isUpper = false;
      this.isLower = true;
      // 重置
      this.refresh();
    },

    /* 移动 */
    move(e){
      if(!this.isScroll) return false;
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: touch.clientX-this.startPage.x,
        y: touch.clientY-this.startPage.y,
      }
      // 移动-距离
      this.tmpPage[this.sp] = this.movePage[this.sp];
      if(this.body[this.sp]<=0 && this.tmpPage[this.sp]>0){
        this.isUpper = true;
        // 控制上限
        let x = this.upper-this.tmpPage[this.sp];
        if(x<0) this.tmpPage[this.sp] = this.upper;
        // 值变化
        if(this.tmpPage[this.sp]!=this.tmpUpper){
          this.tmpUpper = this.tmpPage[this.sp];
          // 加载
          this._translateUpper(x>0?x:0,0);
          // 位置
          this.translate(this.tmpPage[this.sp],0);
          // 事件
          if(this.sp=='x'){
            this.body.x = -this.tmpPage[this.sp];
            this.body.y = 0;
            this.$emit('scroll',this.res());
          }else{
            this.body.x = 0;
            this.body.y = -this.tmpPage[this.sp];
            this.$emit('scroll',this.res());
          }
        }
      }else if(this.body[this.sp]>0 && this.tmpPage[this.sp]<0 && this.body[this.sp]>=this.body.max){
        // 事件-加载
        if(this.isLower){
          this.isLower = false;
          this.$emit(this.sp=='x'?'right':'up',this.res());
        }
      }
    },

    /* 结束 */
    end(e){
      // 控制上限、下限
      if(this.isUpper){
        // 重置
        this.isUpper = false;
        this._translateUpper(this.upper,400);
        this.translate(0,400);
        // 事件
        if(this.sp=='x'){
          this.body.x = 0;
          this.body.y = 0;
          this.$emit('scroll',this.res());
          if(this.tmpPage[this.sp]>=this.upper) this.$emit('left',this.res());
        }else{
          this.body.x = 0;
          this.body.y = 0;
          this.$emit('scroll',this.res());
          if(this.tmpPage[this.sp]>=this.upper) this.$emit('down',this.res());
        }
      }
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

    /* 滑动事件 */
    scroll(){
      this.body.x = this.refHtml.scrollLeft;
      this.body.y = this.refHtml.scrollTop;
      this.$emit('scroll',this.res());
      // 事件-加载
      if(this.isLower && this.tmpPage[this.sp]<0 && this.body[this.sp]>=this.body.max){
        this.isLower = false;
        this.$emit(this.sp=='x'?'right':'up',this.res());
      }
    },

    /* 滚动-位置 */
    translate(xy,time){
      this.refBody.style.transitionDuration = `${time}ms`;
      this.refBody.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      if(this.sp=='x') this.refBody.style.paddingLeft = `${xy}px`;
      else this.refBody.style.paddingTop = `${xy}px`;
    },
    
    /* 加载-左/上 */
    _translateUpper(n,time){
      this.refUpper.style.opacity = (100-n/this.upper*100)/100;
      this.refUpper.style.transitionDuration = `${time}ms`;
      this.refUpper.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      if(this.sp=='x') this.refUpper.style.transform = `translate(-${n}px,0)`;
      else this.refUpper.style.transform = `translate(0,-${n}px)`;
    },

  }
}
</script>
