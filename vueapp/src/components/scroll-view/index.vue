<template>
<div class="wm-scroll_html" ref="html" @touchmove.prevent @click.prevent>
  <!-- 左拉/下拉 -->
  <div ref="upper" v-show="upperLoad" class="wm-scroll_load_body" :style="{backgroundColor:upperBg}">
    <div class="wm-scroll_load">
      <i :class="upperIcon" :style="{color:upperColor}"></i>
    </div>
  </div>
  <!-- 滑动内容 -->
  <div ref="body" class="wm-scroll_body" @touchstart="start" @touchmove="move" @touchend="end">
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
.wm-scroll_html{position: relative; overflow: hidden; width: inherit; height: inherit;}
.wm-scroll_body{position: absolute; transform: translate(0,0);}

.wm-scroll_load_body{position: absolute; opacity: 0;}
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.wm-scroll_load{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
.wm-scroll_load i{position: absolute; margin: -12px 0 0 -12px; font-size: 24px; color: #6FB737; animation: loading 2s linear 0s infinite;}
</style>

<script>
export default {
  name: 'ScrollView',
  props: {
    reset: {type: String, default: ''},
    isScroll: {type: Boolean, default: true},
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
    moveMin: {type: Number, default: 30},
  },
  data(){
    return {
      sp:'', //滑动方向
      body: {w:'',h:''}, //容器-宽高
      bodyObj: {w:'',h:''}, //内容-宽高
      bodyMax: {w:0,h:0},  //最大-宽高
      startPage: {x:0,y:0}, //开始-坐标
      movePage: {x:0,y:0},  //移动-坐标
      tmpPage: {x:0,y:0},  //滑动-坐标
      page: {x:0,y:0},  //当前-坐标
      startTime: 0, //开始时间
      limit: 60,  //最小距离
      cubicBezier: '0.25,0.46,0.45,0.94',
      isMove: false,  //是否滑动
      isUpper: false, //左拉、下拉
      isLower: false, //右拉、上拉
      refBody: {},  //滑动内容
      refUpper: {}, //左上内容
      refLower: {}, //左下内容
    }
  },
  mounted(){
    /* 滑动方向 */
    this.sp = this.scrollX?'x':'y';
    /* 加载动画 */
    this.refUpper = this.$refs.upper;
    this.refLower = this.$refs.lower;
    /* 对象 */
    this.refBody = this.$refs.body;
    /* 默认值 */
    if(this.scrollX){
      // 左
      this.refUpper.style.left = 0;
      this.refUpper.style.width = `${this.upper}px`;
      this.refUpper.style.height = '100%';
      this.refUpper.style.transform = `translate(-${this.upper}px,0)`;
      // 中
      this.refBody.style.minWidth = '100%';
      this.refBody.style.height = '100%';
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
      this.refBody.style.minHeight = '100%';
      this.refBody.style.width = '100%';
      // 下
      this.refLower.style.bottom = 0;
      this.refLower.style.width = '100%';
      this.refLower.style.height = `${this.lower}px`;
      this.refLower.style.transform = `translate(0,${this.lower}px)`;
    }
    /* 监听宽高变化 */
    const resizeObserver = new ResizeObserver(entries=>{
      // for(let entry of entries){ console.log(entry.target.offsetHeight) }
      // 重置位置
      if(this.reset){
        this.page[this.sp]=this.reset=='min'?0:this.bodyMax[this.sp=='x'?'w':'h'];
        this.translate(this.page[this.sp],300);
      }
    });
    resizeObserver.observe(this.refBody);
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
      let body = this.$refs.html;
      // 容器-宽高
      this.body.w = body.offsetWidth;
      this.body.h = body.offsetHeight;
      // 对象-宽高、最大
      if(this.scrollX){
        this.bodyObj.w = this.refBody.children[0].offsetWidth;
        this.bodyMax.w = -(this.bodyObj.w-this.body.w);
      }else{
        this.bodyObj.h = this.refBody.offsetHeight;
        this.bodyMax.h = -(this.bodyObj.h-this.body.h);
      }
    },

    /* 开始 */
    start(e){
      if(!this.isScroll) return false;
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
      window.cancelAnimationFrame(this.animation);
      this.isMove = false;
      let move = this.getTranslate();
      if(this.page[this.sp]>0) move=0;
      else if(this.page[this.sp]<this.bodyMax[this.sp=='x'?'w':'h']) move=this.bodyMax[this.sp=='x'?'w':'h'];
      this.translate(move,16);
      this.page[this.sp] = move;
    },

    /* 移动 */
    move(e){
      if(!this.isScroll) return false;
      // 开始
      let touch = e.touches?e.touches[0]:e;
      this.movePage.x = parseInt((touch.clientX-this.startPage.x)*100)/100;
      this.movePage.y = parseInt((touch.clientY-this.startPage.y)*100)/100;
      // 移动距离
      this.isMove = true;
      this.tmpPage[this.sp] = parseInt((this.page[this.sp]+this.movePage[this.sp])*100)/100;
      // 方向
      if(this.tmpPage[this.sp]>0){
        // 控制上限
        let x = this.upper-this.tmpPage[this.sp];
        if(x<-this.upper) this.tmpPage[this.sp] = this.upper*2;
        // 加载
        this._translateUpper(x>0?x:0);
        // 触发-左拉、下拉
        this.isUpper = this.tmpPage[this.sp]>=this.upper?true:false;
      }else{
        // 控制下限
        let y = this.lower+(this.tmpPage[this.sp]-this.bodyMax[this.sp=='x'?'w':'h']);
        if(y<-this.lower) this.tmpPage[this.sp] = this.bodyMax[this.sp=='x'?'w':'h']-this.lower*2;
        // 加载
        this._translateLower(y>0?y:0);
        // 触发-左拉、下拉
        this.isLower = this.tmpPage[this.sp]<=this.bodyMax[this.sp=='x'?'w':'h']-this.lower?true:false;
      }
      // 位置
      this.translate(this.tmpPage[this.sp],100);
      // 事项
      if(this.scrollX) this.$emit('scroll',{x:this.tmpPage[this.sp],y:0});
      else this.$emit('scroll',{x:0,y:this.tmpPage[this.sp]});
    },

    /* 结束 */
    end(e){
      // 方向
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
      // 加速-是否滑动
      if(!this.isScroll || !this.isMove) return false;
      // 加速-比例
      let time = parseInt(e.timeStamp-this.startTime);
      let n = Math.abs(this.movePage[this.sp]/time);
      n = n<0.8?0:n;
      let move = parseInt(n*100*8*100)/100;
      let t = parseInt(move*2);
      // 加速-距离
      move = this.movePage[this.sp]>0?move:-move;
      this.tmpPage[this.sp] = parseInt((this.tmpPage[this.sp]+move)*100)/100;
      // 控制上限、下限
      if(this.tmpPage[this.sp]>0){
        // 触发-左拉、下拉
        if(this.isUpper){
          this.isUpper = false;
          if(this.scrollX) this.$emit('left',this.res());
          else this.$emit('down',this.res());
        }
        // 限制距离
        t = t-this.tmpPage[this.sp]*2;
        t = t<=0?300:t;
        this.tmpPage[this.sp] = 0;
        this._translateUpper(this.upper);
      }else if(this.tmpPage[this.sp]<this.bodyMax[this.sp=='x'?'w':'h']){
        // 触发-右拉、上拉
        if(this.isLower){
          this.isLower = false;
          if(this.scrollX) this.$emit('right',this.res());
          else this.$emit('up',this.res());
        }
        // 限制距离
        t = t-(this.bodyMax[this.sp=='x'?'w':'h']-this.tmpPage[this.sp])*2;
        t = t<=0?300:t;
        this.tmpPage[this.sp] = this.bodyMax[this.sp=='x'?'w':'h'];
        this._translateLower(this.lower);
      }
      // 加速-位置
      this.translate(this.tmpPage[this.sp],t);
      // 加速-实时
      this.progress = 0;
      this.t = t/10;
      this.animation = window.requestAnimationFrame(this.render);
    },

    /* 动画时间 */
    render(){
      this.progress += 1;
      // 位置
      let move = this.getTranslate();
      // 事项
      if(this.scrollX) this.$emit('scroll',{x:move,y:0});
      else this.$emit('scroll',{x:0,y:move});
      // 控制
      if(this.progress < this.t){
        this.animation = window.requestAnimationFrame(this.render);
      }
    },

    /* 滚动-位置 */
    translate(xy,time){
      if(this.scrollX) this.refBody.style.transform = `translate(${xy}px,0)`;
      else this.refBody.style.transform = `translate(0,${xy}px)`;
      this.refBody.style.transitionDuration = `${time}ms`;
      this.refBody.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
    },
    /* 实时位置 */
    getTranslate(){
      const xy = this.scrollX?4:5;
      let v = window.getComputedStyle(this.refBody).transform;
      v = parseInt(parseFloat(v.substring(7).split(',')[xy])*100)/100;
      return v;
    },
    /* 滚动-指定位置 */
    scrollTo(xy,time){
      // 初始化
      this.init();
      // 参数
      xy = xy || 0;
      if(xy=='max') xy=this.bodyMax[this.sp=='x'?'w':'h'];
      else if(xy=='min') xy=0;
      time = time || 600;
      // 位置
      this.translate(xy,time);
      this.page[this.sp] = xy;
    },
    
    /* 加载-左/上 */
    _translateUpper(n){
      this.refUpper.style.opacity = (100-n/this.upper*100)/100;
      if(this.scrollX) this.refUpper.style.transform = `translate(-${n}px,0)`;
      else this.refUpper.style.transform = `translate(0,-${n}px)`;
    },
    /* 加载-右/下 */
    _translateLower(n){
      this.refLower.style.opacity = (100-n/this.lower*100)/100;
      if(this.scrollX) this.refLower.style.transform = `translate(${n}px,0)`;
      else this.refLower.style.transform = `translate(0,${n}px)`;
    },
  }
}
</script>
