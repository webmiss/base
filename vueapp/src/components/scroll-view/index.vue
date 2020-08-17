<template>
<div class="wm-scroll_html">
  <!-- 左拉/下拉 -->
  <div ref="upper" v-show="upperLoad" class="wm-scroll_load_body" :style="{backgroundColor:upperBg}">
    <div class="wm-scroll_load">
      <i :class="upperIcon" :style="{color:upperColor}"></i>
    </div>
  </div>
  <!-- 滑动内容 -->
  <div ref="html" class="wm-scroll_view" @touchstart="start" @touchmove="move" @touchend="end">
    <slot></slot>
  </div>
  <!-- 右拉/上拉 -->
  <div ref="lower" v-show="lowerLoad" class="wm-scroll_load_body" :style="{backgroundColor:lowerBg}">
    <div class="wm-scroll_load">
      <i :class="lowerIcon" :style="{color:lowerColor}"></i>
    </div>
  </div>
</div>
</template>

<style scoped>
.wm-scroll_html{position: relative; overflow: hidden;}
/* 内容 */
.wm-scroll_view{position: absolute; overflow: hidden; width: 100%; height: 100%; transform: translate(0,0);}
.wm-scroll_view::-webkit-scrollbar{display:none}
/* Loading */
.wm-scroll_load_body{position: absolute; overflow: hidden; z-index: 1; opacity: 0;}
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.wm-scroll_load{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
.wm-scroll_load i{position: absolute; margin: -12px 0 0 -12px; font-size: 22px; color: #6FB737; animation: loading 2s linear 0s infinite;}
</style>

<script>
export default {
  name: 'ScrollView',
  props: {
    isScroll: {type: Boolean, default: true},
    scrollX: {type: Boolean, default: false},
    scrollY: {type: Boolean, default: true},
    upper: {type: Number, default: 64},
    lower: {type: Number, default: 64},
    upperLoad: {type: Boolean, default: true},
    lowerLoad: {type: Boolean, default: true},
    upperIcon: {type: String, default: 'ui ui_loading'},
    lowerIcon: {type: String, default: 'ui ui_loading'},
    upperBg: {type: String, default: ''},
    lowerBg: {type: String, default: ''},
    upperColor: {type: String, default: ''},
    lowerColor: {type: String, default: ''},
  },
  data(){
    return {
      sp:'', //滑动方向
      html: {w:0,h:0},  //容器
      body: {w:0,h:0,x:0,y:0},  //内容
      limit: 60,  //最小距离
      refUpper: {}, //左上内容
      refLower: {}, //左下内容
      refHtml: {}, //中间内容
      cubicBezier: '0.25,0.46,0.45,0.94', //动画
    }
  },
  mounted(){
    /* 滑动方向 */
    this.sp = this.scrollX?'x':'y';
    /* 加载动画 */
    this.refUpper = this.$refs.upper;
    this.refLower = this.$refs.lower;
    /* 对象 */
    this.refHtml = this.$refs.html;
    /* 默认值 */
    if(this.sp=='x'){
      // 左
      this.refUpper.style.left = 0;
      this.refUpper.style.width = `${this.upper}px`;
      this.refUpper.style.height = '100%';
      this.refUpper.style.transform = `translate(-${this.upper}px,0)`;
      // 中
      this.refHtml.style.overflowX = 'auto';
      // 右
      this.refLower.style.right = 0;
      this.refLower.style.width = `${this.lower}px`;
      this.refLower.style.height = '100%';
      this.refLower.style.transform = `translate(${this.lower}px,0)`;
    }else{
      // 上
      this.refUpper.style.top = 0;
      this.refUpper.style.width = '100%';
      this.refUpper.style.height = `${this.upper}px`;
      this.refUpper.style.transform = `translate(0,-${this.upper}px)`;
      // 中
      this.refHtml.style.overflowY = 'auto';
      // 下
      this.refLower.style.bottom = 0;
      this.refLower.style.width = '100%';
      this.refLower.style.height = `${this.lower}px`;
      this.refLower.style.transform = `translate(0,${this.lower}px)`;
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

    /* 开始 */
    start(e){
      // 开始坐标
      let touch = e.touches?e.touches[0]:e;
      this.movePage = {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage = {x:touch.clientX,y:touch.clientY};
      this.isUpper = false;
      this.isLower = false;
      // 容器-宽高
      this.html.w = this.refHtml.offsetWidth;
      this.html.h = this.refHtml.offsetHeight;
      // 内容-宽高
      this.body.w = this.refHtml.scrollWidth;
      this.body.h = this.refHtml.scrollHeight;
      // 开启滑动
      this.scrollEnabled('auto');
    },

    /* 移动 */
    move(e){
      if(!this.isScroll) return false;
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt(touch.clientX-this.startPage.x),
        y: parseInt(touch.clientY-this.startPage.y),
      }
      // 移动-距离
      this.tmpPage[this.sp] = this.movePage[this.sp];
      if(this.body[this.sp]<=0 && this.tmpPage[this.sp]>0){
        this.isUpper = true;
        this.scrollEnabled('hidden');
        // 控制上限
        let x = this.upper-this.tmpPage[this.sp];
        if(x<0) this.tmpPage[this.sp] = this.upper;
        // 值变化
        if(this.tmpPage[this.sp]!=this.tmpUpper){
          this.tmpUpper = this.tmpPage[this.sp];
          // 加载
          this._translateUpper(x>0?x:0,100);
          // 位置
          this.translate(this.tmpPage[this.sp],100);
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
      }else if(this.body[this.sp]>0 && this.body[this.sp]>=this.body[this.sp=='x'?'w':'h']-this.html[this.sp=='x'?'w':'h'] && this.tmpPage[this.sp]<0){
        this.isLower = true;
        this.scrollEnabled('hidden');
        // 控制上限
        let y = this.lower+this.tmpPage[this.sp];
        if(y<0) this.tmpPage[this.sp] = -this.lower;
        // 值变化
        if(this.tmpPage[this.sp]!=this.tmpLower){
          this.tmpLower = this.tmpPage[this.sp];
          // 加载
          this._translateLower(y>0?y:0,100);
          // 位置
          this.translate(this.tmpPage[this.sp],100);
          // 事件
          if(this.sp=='x'){
            this.body.x = this.body.w-this.html.w-this.tmpPage[this.sp];
            this.body.y = 0;
            this.$emit('scroll',this.res());
          }else{
            this.body.x = 0;
            this.body.y = this.body.h-this.html.h-this.tmpPage[this.sp];
            this.$emit('scroll',this.res());
          }
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
        this.scrollEnabled('auto');
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
      }else if(this.isLower){
        // 重置
        this.isLower = false;
        this._translateLower(this.lower,400);
        this.translate(0,400);
        this.scrollEnabled('auto');
        // 事件
        if(this.sp=='x'){
          this.body.x = this.body.w-this.html.w;
          this.body.y = 0;
          this.$emit('scroll',this.res());
          this.$emit('right',this.res());
        }else{
          this.body.x = 0;
          this.body.y = this.body.h-this.html.h;
          this.$emit('scroll',this.res());
          this.$emit('up',this.res());
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
      this.body.x = parseInt(this.refHtml.scrollLeft);
      this.body.y = parseInt(this.refHtml.scrollTop);
      this.$emit('scroll',this.res());
    },

    /* 滑动状态 */
    scrollEnabled(state){
      state = state || 'auto';
      if(this.sp=='x') this.refHtml.style.overflowX = state;
      else this.refHtml.style.overflowY = state;
    },

    /* 滚动-位置 */
    translate(xy,time){
      this.refHtml.style.transitionDuration = `${time}ms`;
      this.refHtml.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      if(this.sp=='x') this.refHtml.style.transform = `translate(${xy}px,0)`;
      else this.refHtml.style.transform = `translate(0,${xy}px)`;
    },
    
    /* 加载-左/上 */
    _translateUpper(n,time){
      this.refUpper.style.opacity = (100-n/this.upper*100)/100;
      this.refUpper.style.transitionDuration = `${time}ms`;
      this.refUpper.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      if(this.sp=='x') this.refUpper.style.transform = `translate(-${n}px,0)`;
      else this.refUpper.style.transform = `translate(0,-${n}px)`;
    },
    /* 加载-右/下 */
    _translateLower(n,time){
      this.refLower.style.opacity = (100-n/this.lower*100)/100;
      this.refLower.style.transitionDuration = `${time}ms`;
      this.refLower.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      if(this.sp=='x') this.refLower.style.transform = `translate(${n}px,0)`;
      else this.refLower.style.transform = `translate(0,${n}px)`;
    },
  }
}
</script>
