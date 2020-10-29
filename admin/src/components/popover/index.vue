<template>
<div v-show="show">
  <div ref="PopupBG" class="wm-popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="clickBG()"></div>
  <div ref="PopupBody" class="wm-popup_body" :style="{backgroundColor:bgColor}"><slot></slot></div>
</div>
</template>

<style scoped>
.wm-popup_bg,.wm-popup_body{position: fixed; z-index: 1000;}
.wm-popup_bg{width: 100%; height: 100%; top: 0; left: 0; opacity: 0;}
.wm-popup_body{opacity: 0;}
</style>

<script>
export default {
  name: 'Popup',
  props: {
    show: {type: Boolean, default: false},  //是否显示
    position: {type: String, default: 'center'},  //位置
    opacity: {type: Number, default: 0.7},  //背景透明度
    bgColor: {type: String, default: ''}, //内容背景颜色
    bgClose: {type: Boolean, default: true},  //点击背景关闭
    time: {type: Number, default: 400},  //动画时间
  },
  watch:{
    show(val){
      if(val) this.animation(val);
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init(){
      const bg = this.$refs.PopupBG.style;
      const body = this.$refs.PopupBody.style;
      // 默认值
      bg.opacity = 0;
      if(this.position=='left'){
        body.height = '110%';
        body.left = 0;
        body.top = 0;
        body.opacity = 1;
        body.transform = 'translate(-110%,0)';
      }else if(this.position=='right'){
        body.height = '100%';
        body.right = 0;
        body.top = 0;
        body.opacity = 1;
        body.transform = 'translate(110%,0)';
      }else if(this.position=='top'){
        body.width = '100%';
        body.left = 0;
        body.top = 0;
        body.opacity = 1;
        body.transform = 'translate(0,-110%)';
      }else if(this.position=='bottom'){
        body.width = '100%';
        body.left = 0;
        body.bottom = 0;
        body.opacity = 1;
        body.transform = 'translate(0,110%)';
      }else{
        body.left = '50%';
        body.top = '30%';
        body.opacity = 0;
        body.transform = 'translate(-50%,-50%)';
      }
    },

    /* 显示 */
    showBody(){
      const bg = this.$refs.PopupBG.style;
      const body = this.$refs.PopupBody.style;
      // 动画
      bg.transitionDuration = this.time+'ms';
      body.transitionDuration = this.time+'ms';
      // 属性
      bg.opacity = 1;
      if(this.position=='left'){
        body.transform = 'translate(-1px,0)';
      }else if(this.position=='right'){
        body.transform = 'translate(1px,0)';
      }else if(this.position=='top'){
        body.transform = 'translate(0,-1px)';
      }else if(this.position=='bottom'){
        body.transform = 'translate(0,1px)';
      }else{
        body.opacity = 1;
        body.top = '50%';
      }
      // 更新状态
      setTimeout(()=>{ this.$emit('update:show',true); },this.time);
    },

    /* 隐藏 */
    hideBody(){
      const bg = this.$refs.PopupBG.style;
      const body = this.$refs.PopupBody.style;
      // 动画
      bg.transitionDuration = this.time+'ms';
      body.transitionDuration = this.time+'ms';
      // 属性
      bg.opacity = 0;
      if(this.position=='left'){
        body.transform = 'translate(-110%,0)';
      }else if(this.position=='right'){
        body.transform = 'translate(110%,0)';
      }else if(this.position=='top'){
        body.transform = 'translate(0,-110%)';
      }else if(this.position=='bottom'){
        body.transform = 'translate(0,110%)';
      }else{
        body.opacity = 0;
        body.top = '30%'
      }
      // 更新状态
      setTimeout(()=>{ if(this.show) this.$emit('update:show',false); },this.time);
    },

    /* 控制动画 */
    animation(show){
      if(show) setTimeout(()=>{ this.showBody(); },300);
      else this.hideBody();
    },

    /* 点击背景 */
    clickBG(){
      if(this.bgClose) this.animation(false);
    },

    /* 关闭 */
    close(){
      this.animation(false);
    },

  }
}
</script>
