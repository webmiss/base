<template>
  <div class="wm-swipe_cell" @touchmove.prevent @click.prevent>
    <!-- Body -->
    <div ref="body" class="wm-swipe_cell_body" @touchstart="start" @touchmove="move" @touchend="end">
      <slot name="body"></slot>
    </div>
    <!-- Right -->
    <div ref="right" class="wm-swipe_cell_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.wm-swipe_cell{user-select: none; position: relative; overflow: hidden; cursor: grab; background-color: #FFF;}
.wm-swipe_cell_body{overflow: hidden; height: 100%; transform: translate(0,0);}
.wm-swipe_cell_right{position: absolute; top: 0; right: 0; height: 100%; transform: translate(100%,0);}
.wm-swipe_cell_right button{height: 100%; line-height: 100%; border-radius: 0;}
</style>

<script>
export default {
  name: 'SwipeCell',
  props: {},
  data(){
    return {
      sp: 'x',  //移动方向
      body: null, //内容对象
      right: null,  //功能对象
      startPage: {x:0,y:0}, //开始-坐标
      movePage: {x:0,y:0},  //移动-坐标
      tmpPage: {x:0,y:0},  //滑动-坐标
      page: {x:0,y:0},  //当前-坐标
      min: 50,  //最小移动
      max: 0, //最大移动
      time: 300,  //时间
      cubicBezier: '0.25,0.46,0.45,0.94', //动画
    }
  },
  mounted(){},
  methods:{

    /* 开始 */
    start(e){
      // 重置动画
      this.reset();
      // 开始坐标
      let touch = e.touches?e.touches[0]:e;
      this.movePage.x = 0;
      this.movePage.y = 0;
      this.startPage.x = touch.clientX;
      this.startPage.y = touch.clientY;
      // 对象
      this.body = this.$refs.body;
      this.right = this.$refs.right;
      this.body.style.transitionDuration = `0ms`;
      this.right.style.transitionDuration = `0ms`;
      this.body.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      this.right.style.transitionTimingFunction = `cubic-bezier(${this.cubicBezier})`;
      // 最大移动
      this.max = this.right.offsetWidth;
      // 
      this.page[this.sp] = this.getTranslate(this.body);
    },

    /* 移动 */
    move(e){
      let touch = e.touches?e.touches[0]:e;
      this.movePage.x = parseInt((touch.clientX-this.startPage.x)*100)/100;
      this.movePage.y = parseInt((touch.clientY-this.startPage.y)*100)/100;
      // 移动距离
      this.tmpPage[this.sp] = parseInt((this.page[this.sp]+this.movePage[this.sp])*100)/100;
      // 控制距离
      if(this.tmpPage[this.sp]>0) this.tmpPage[this.sp]=0;
      if(this.tmpPage[this.sp]<-this.max) this.tmpPage[this.sp] = -this.max;
      // 位置
      this.translate(this.tmpPage[this.sp],0);
    },

    /* 结束 */
    end(e){
      // 控制距离
      if(this.movePage[this.sp]<0) this.tmpPage[this.sp]=-this.max;
      else if(this.movePage[this.sp]>0) this.tmpPage[this.sp]=0;
      else return false;
      // 位置
      this.translate(this.tmpPage[this.sp],this.time);
      this.page[this.sp] = this.tmpPage[this.sp];
    },

    /* 滚动-位置 */
    translate(x,time){
      this.body.style.transform = `translate(${x}px,0)`;
      this.right.style.transform = `translate(${this.max+x}px,0)`;
      if(time){
        this.body.style.transitionDuration = `${time}ms`;
        this.right.style.transitionDuration = `${time}ms`;
      }
    },

    /* 实时位置 */
    getTranslate(obj){
      let v = window.getComputedStyle(obj).transform;
      v = parseInt(parseFloat(v.substring(7).split(',')[4])*100)/100;
      return v;
    },

    /* 重置 */
    reset(){
      let body = document.getElementsByClassName('wm-swipe_cell_body');
      let right = document.getElementsByClassName('wm-swipe_cell_right');
      let res = 0;
      for(let i=0; i<body.length; i++){
        res = this.getTranslate(body[i]);
        if(res && this.$refs.body!=body[i]){
          body[i].style.transform = `translate(0,0)`;
          body[i].style.transitionDuration = `${this.time}ms`;
          right[i].style.transform = `translate(100%,0)`;
          right[i].style.transitionDuration = `${this.time}ms`;
        }
      }
    },

  }
}
</script>