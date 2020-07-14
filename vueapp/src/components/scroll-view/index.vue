<template>
<div class="wm-scroll_html" ref="body" @touchmove.prevent>
  <!-- 左拉/下拉 -->
  <div ref="upper" v-show="upperLoad" class="wm-scroll_load_body" :style="{backgroundColor:upperBg}">
    <div class="wm-scroll_load">
      <i :class="upperIcon" :style="{color:upperColor}"></i>
    </div>
  </div>
  <!-- 滑动内容 -->
  <div class="wm-scroll_body" ref="scroll" @touchstart="start" @touchmove="move" @touchend="end">
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
.wm-scroll_html{position: relative;}
.wm-scroll_body{position: absolute;}

.wm-scroll_load_body{position: absolute; opacity: 1;}
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.wm-scroll_load{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
.wm-scroll_load i{position: absolute; margin: -12px 0 0 -12px; font-size: 24px; color: #6FB737; animation: loading 2s linear 0s infinite;}
</style>

<script>
export default {
  name: 'ScrollView',
  props: {
    scroll: {type: Boolean, default: true},
    scrollX: {type: Boolean, default: false},
    scrollY: {type: Boolean, default: true},
    upper: {type: Number, default: 50},
    lower: {type: Number, default: 50},
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
      obj: null,  //滑动对象
      body: {w:'',h:''}, //容器-宽高
      bodyObj: {w:'',h:''}, //内容-宽高
      bodyMax: {w:0,h:0},  //最大-宽高
      startPage: {x:0,y:0}, //开始-坐标
      movePage: {x:0,y:0},  //移动-坐标
      tmpPage: {x:0,y:0},  //滑动-坐标
      page: {x:0,y:0},  //当前-坐标
      startTime: 0, //开始时间
      cubicBezier: '0.25,0.46,0.45,0.94',
      isMove: false,  //是否滑动
      each: 0 //动画分段
    }
  },
  mounted(){
    /* 滑动方向 */
    this.sp = this.scrollX?'x':'y';
    /* 加载动画 */
    this.refUpper = this.$refs.upper;
    this.refLower = this.$refs.lower;
    /* 对象 */
    this.obj = this.$refs.scroll;
    /* 默认值 */
    if(this.scrollX){
      // 左
      this.refUpper.style.left = 0;
      this.refUpper.style.width = this.upper+'px';
      this.refUpper.style.height = '100%';
      this.refUpper.style.transform = 'translate(-'+this.upper+'px,0)';
      // 中
      this.obj.style.minWidth = '100%';
      this.obj.style.height = '100%';
      // 右
      this.refLower.style.right = 0;
      this.refLower.style.width = this.lower+'px';
      this.refLower.style.height = '100%';
      this.refLower.style.transform = 'translate('+this.lower+'px,0)';
    }else{
      // 上
      this.refUpper.style.top = 0;
      this.refUpper.style.width = '100%';
      this.refUpper.style.height = this.upper+'px';
      this.refUpper.style.transform = 'translate(0,-'+this.upper+'px)';
      // 中
      this.obj.style.minHeight = '100%';
      this.obj.style.width = '100%';
      // 下
      this.refLower.style.bottom = 0;
      this.refLower.style.width = '100%';
      this.refLower.style.height = this.lower+'px';
      this.refLower.style.transform = 'translate(0,'+this.lower+'px)';
    }
  },
  methods:{

    /* 返回 */
    res(){
      const data = {
        body: this.body,
        client: this.bodyMax,
        page: this.page,
        move: this.movePage,
      }
      return data;
    },

    /* 初始化 */
    init(){
      /* 容器 */
      let body = this.$refs.body;
      // 容器-宽高
      this.body.w = body.offsetWidth;
      this.body.h = body.offsetHeight;
      // 对象-宽高、最大
      if(this.scrollX){
        this.bodyObj.w = this.obj.children[0].offsetWidth;
        this.bodyMax.w = -(this.bodyObj.w-this.body.w);
      }else{
        this.bodyObj.h = this.obj.offsetHeight;
        this.bodyMax.h = -(this.bodyObj.h-this.body.h);
      }
    },

    /* 开始 */
    start(e){
      let touch = e.touches?e.touches[0]:e;
      // 初始化
      this.init();
      // 开始时间
      this.startTime = e.timeStamp;
      // 开始坐标
      this.movePage.x = 0;
      this.movePage.y = 0;
      this.startPage.x = touch.clientX;
      this.startPage.y = touch.clientY;
      // 重置动画
      this.obj.style.transition = 'transform 0ms';
      if(this.isMove){
        this.isMove = false;
        clearInterval(this.timeMove);
        clearTimeout(this.timeEnd);
        let p = parseInt(this.page[this.sp]+this.each*30);
        p = p>this.tmpPage[this.sp]?this.tmpPage[this.sp]:p;
        this.page[this.sp] = p;
        this.obj.style.transition = 'transform 300ms';
        this.translate(p);
        
      }
    },

    /* 移动 */
    move(e){
      if(!this.scroll) return false;
      // 开始
      let touch = e.touches?e.touches[0]:e;
      this.movePage.x = touch.clientX-this.startPage.x;
      this.movePage.y = touch.clientY-this.startPage.y;
      // 移动距离
      this.tmpPage[this.sp] = parseInt((this.page[this.sp]+this.movePage[this.sp])*100)/100;
      // 跟随手势
      if(this.scrollX){
        // 加载-左拉、右拉
        if(this.tmpPage[this.sp]>0){
          let x = this.upper-this.tmpPage[this.sp];
          // 控制上限
          if(x<-this.upper) this.tmpPage[this.sp] = this.upper*2;
          // 透明度
          this.refUpper.style.transform = 'translate(-'+(x>0?x:0)+'px,0)';
          this.refUpper.style.opacity = Math.abs(parseInt(this.tmpPage[this.sp]/this.upper*100)/100);
        }else if(this.tmpPage[this.sp]<this.bodyMax.w){
          let y = this.lower+(this.tmpPage[this.sp]-this.bodyMax.w);
          // 控制上限
          if(y<-this.lower) this.tmpPage[this.sp] = this.bodyMax.w-this.lower*2;
          // 透明度
          this.refLower.style.opacity = Math.abs(parseInt(this.tmpPage[this.sp]/this.lower*100)/100);
          this.refLower.style.transform = 'translate('+(y>0?y:0)+'px,0)';
        }
        // 位置
        this.translate(this.tmpPage[this.sp]);
        // 触发-位置
        this.$emit('scroll',{x:this.tmpPage[this.sp],y:0});
      }else{
        // 加载-下拉、上拉
        if(this.tmpPage[this.sp]>0){
          let y = this.upper-this.tmpPage[this.sp];
          // 控制上限
          if(y<-this.upper) this.tmpPage[this.sp] = this.upper*2;
          // 透明度
          this.refUpper.style.transform = 'translate(0,-'+(y>0?y:0)+'px)';
          this.refUpper.style.opacity = Math.abs(parseInt(this.tmpPage[this.sp]/this.upper*100)/100);
        }else if(this.tmpPage[this.sp]<this.bodyMax.h){
          let y = this.lower+(this.tmpPage[this.sp]-this.bodyMax.h);
          // 控制上限
          if(y<-this.lower) this.tmpPage[this.sp] = this.bodyMax.h-this.lower*2;
          // 透明度
          this.refLower.style.opacity = Math.abs(parseInt(this.tmpPage[this.sp]/this.lower*100)/100);
          this.refLower.style.transform = 'translate(0,'+(y>0?y:0)+'px)';
        }
        // 位置
        this.translate(this.tmpPage[this.sp]);
        // 触发-位置
        this.$emit('scroll',{x:0,y:this.tmpPage[this.sp]});
      }
    },

    /* 结束 */
    end(e){
      // 方向
      if(this.movePage.x>60) this.$emit('swipe','left');
      if(this.movePage.x<-60) this.$emit('swipe','right');
      if(this.movePage.y>60) this.$emit('swipe','down');
      if(this.movePage.y<-60) this.$emit('swipe','up');
      // 反弹
      let t = 0;
      if(this.tmpPage[this.sp]>0){
        // 触发-左拉、下拉
        if(this.tmpPage[this.sp]>=this.upper){
          if(this.scrollX) this.$emit('left',this.res());
          else this.$emit('down',this.res());
        }
        // 动画
        t = 200;
        this.tmpPage[this.sp] = 0;
        this.obj.style.transition = 'all '+t+'ms ease-in-out 0ms';
        this.refUpper.style.transition = 'all '+t+'ms ease-in-out 0ms';
        // 位置
        this.translate(this.tmpPage[this.sp]);
        this.refUpper.style.opacity = 0;
        this._translateUpper(this.upper);
        this.page[this.sp] = this.tmpPage[this.sp];
      }else if(this.tmpPage[this.sp]<this.bodyMax[this.sp=='x'?'w':'h']){
        // 触发-右拉、上拉
        if(this.tmpPage[this.sp]<=this.bodyMax[this.sp=='x'?'w':'h']-this.lower){
          if(this.scrollX) this.$emit('right',this.res());
          else this.$emit('up',this.res());
        }
        // 动画
        t = 200;
        this.tmpPage[this.sp] = this.bodyMax[this.sp=='x'?'w':'h'];
        this.obj.style.transition = 'all '+t+'ms ease-in-out 0ms';
        this.refLower.style.transition = 'all '+t+'ms ease-in-out 0ms';
        // 位置
        this.translate(this.tmpPage[this.sp]);
        this.refLower.style.opacity = 0;
        this._translateLower(this.lower);
        this.page[this.sp] = this.tmpPage[this.sp];
      }else{
        // 是否加速
        let time = e.timeStamp-this.startTime;
        let nt = Math.abs(time/this.movePage[this.sp]);
        let n = nt>0.24 && nt<2.4?2.4-nt:0;
        // 加速距离
        let move = parseInt(this.movePage[this.sp]*n*2.4*100)/100;
        this.tmpPage[this.sp] = parseInt((this.tmpPage[this.sp]+move)*100)/100;
        if(this.tmpPage[this.sp]>0){
          move = this.tmpPage[this.sp];
          this.tmpPage[this.sp] = 0;
        }else if(this.tmpPage[this.sp]<this.bodyMax[this.sp=='x'?'w':'h']){
          move = -(this.bodyMax[this.sp=='x'?'w':'h']-this.tmpPage[this.sp]);
          this.tmpPage[this.sp] = this.bodyMax[this.sp=='x'?'w':'h'];
        }
        this.page[this.sp] = this.tmpPage[this.sp];
        if(n==0) return false;
        this.isMove = true;
        // 加速时间
        t = parseInt(n*100*8);
        if(t>2400) t=2400;
        else if(t<300) t=300;
        // 加速分段
        let i = 0;
        const x = 10;
        const t0 = parseInt(t/x);
        const t1 = t0*0.3;
        const t2 = t0*0.7;
        const start = this.tmpPage[this.sp]-move;
        this.each = move/(t/x);
        clearInterval(this.timeMove);
        this.timeMove = setInterval(()=>{
          i++;
          // 当前位置
          this.page[this.sp] = parseInt((start+i*this.each)*100)/100;
          // 事件
          if(this.scrollX) this.$emit('scroll',{x:this.page[this.sp],y:0});
          else this.$emit('scroll',{x:0,y:this.page[this.sp]});
          // 动画
          if(i<t1) this.cubicBezier = '0.23,1,0.32,1';
          else if(i>t2) this.cubicBezier = '0.165,0.84,0.44,1';
          else this.cubicBezier = '0.25,0.46,0.45,0.94';
        },x);
        // this.obj.style.transitionDuration = t+'ms';
        // this.obj.style.transitionTimingFunction = 'cubic-bezier('+this.cubicBezier+')';
        // 位置
        this.obj.style.transition = 'transform '+t+'ms';
        this.translate(this.tmpPage[this.sp]);
      }
      /* 结束动画 */
      clearTimeout(this.timeEnd);
      this.timeEnd = setTimeout(()=>{
        // 回弹
        if(this.tmpPage[this.sp]>0){
          this.page[this.sp] = 0;
          this.translate(this.page[this.sp]);
        }else if(this.tmpPage[this.sp]<this.bodyMax[this.sp=='x'?'w':'h']){
          this.page[this.sp] = this.bodyMax[this.sp=='x'?'w':'h'];
          this.translate(this.page[this.sp]);
        }
        // 事件
        this.$emit('end',this.res());
        // 清理定时
        clearInterval(this.timeMove);
        this.isMove = false;
      },t);
    },

    /* 滚动-位置 */
    translate(n){
      if(this.scrollX){
        this.obj.style.transform = 'translate('+n+'px,0)';
      }else{
        this.obj.style.transform = 'translate(0,'+n+'px)';
      }
    },
    /* 加载-左/上 */
    _translateUpper(n){
      if(this.scrollX){
        this.refUpper.style.transform = 'translate(-'+n+'px,0)';
      }else{
        this.refUpper.style.transform = 'translate(0,-'+n+'px)';
      }
    },
    /* 加载-右/下 */
    _translateLower(n){
      if(this.scrollX){
        this.refLower.style.transform = 'translate('+n+'px,0)';
      }else{
        this.refLower.style.transform = 'translate(0,'+n+'px)';
      }
    },

    /* 滚动-指定位置 */
    scrollTo(x,y,time){
      // 初始化
      this.init();
      // 参数
      x = x || 0;
      y = y || 0;
      time = time || 300;
      // 滑动
      this.obj.style.transitionDuration = time+'ms';
      this.obj.style.transitionTimingFunction = 'cubic-bezier('+this.cubicBezier+')';
      if(this.scrollX){
        x = x=='right'?this.bodyMax['w']:x;
        this.obj.style.transform = 'translate('+x+'px,0)';
      }else{
        y = y=='bottom'?this.bodyMax['h']:y;
        this.obj.style.transform = 'translate(0,'+y+'px)';
      }
      // 记录坐标
      this.page.x = x;
      this.page.y = y;
    },

  }
}
</script>
