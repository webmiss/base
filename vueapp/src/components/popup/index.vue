<template>
<div v-show="show">
  <div ref="PopupBG" class="wm-popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="_clickBG()"></div>
  <div ref="PopupBody" class="wm-popup_body" :style="{backgroundColor:bgColor}">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.wm-popup_bg,.wm-popup_body{position: fixed; z-index: 1000;}
.wm-popup_bg{width: 100%; height: 100%; top: 0; left: 0; opacity: 0;}
.wm-popup_body{opacity: 0;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Popup',
  props: {
    show: {type: Boolean, default: false},  //是否显示
    position: {type: String, default: 'center'},  //位置
    opacity: {type: Number, default: 0.4},  //背景透明度
    bgColor: {type: String, default: ''}, //内容背景颜色
    bgClose: {type: Boolean, default: true},  //点击背景关闭
    time: {type: Number, default: 400},  //动画时间
  },
  watch:{
    show(val: boolean){
      if(val) this._animation(val);
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init(){
      const bg: any = this.$refs.PopupBG;
      const body: any = this.$refs.PopupBody;
      // 默认值
      bg.style.opacity = 0;
      if(this.position=='left'){
        body.style.height = '110%';
        body.style.left = 0;
        body.style.top = 0;
        body.style.opacity = 1;
        body.style.transform = 'translate(-110%,0)';
      }else if(this.position=='right'){
        body.style.height = '100%';
        body.style.right = 0;
        body.style.top = 0;
        body.style.opacity = 1;
        body.style.transform = 'translate(110%,0)';
      }else if(this.position=='top'){
        body.style.width = '100%';
        body.style.left = 0;
        body.style.top = 0;
        body.style.opacity = 1;
        body.style.transform = 'translate(0,-110%)';
      }else if(this.position=='bottom'){
        body.style.width = '100%';
        body.style.left = 0;
        body.style.bottom = 0;
        body.style.opacity = 1;
        body.style.transform = 'translate(0,110%)';
      }else{
        body.style.left = '50%';
        body.style.top = '30%';
        body.style.opacity = 0;
        body.style.transform = 'translate(-50%,-50%)';
      }
    },

    /* 显示 */
    _showBody(){
      const bg: any = this.$refs.PopupBG;
      const body: any = this.$refs.PopupBody;
      // 动画
      bg.style.transitionDuration = this.time+'ms';
      body.style.transitionDuration = this.time+'ms';
      // 属性
      bg.style.opacity = 1;
      if(this.position=='left'){
        body.style.transform = 'translate(-1px,0)';
      }else if(this.position=='right'){
        body.style.transform = 'translate(1px,0)';
      }else if(this.position=='top'){
        body.style.transform = 'translate(0,-1px)';
      }else if(this.position=='bottom'){
        body.style.transform = 'translate(0,1px)';
      }else{
        body.style.opacity = 1;
        body.style.top = '50%';
      }
      // 更新状态
      setTimeout(()=>{ this.$emit('update:show',true); },this.time);
    },

    /* 隐藏 */
    _hideBody(){
      const bg: any = this.$refs.PopupBG;
      const body: any = this.$refs.PopupBody;
      // 动画
      bg.style.transitionDuration = this.time+'ms';
      body.style.transitionDuration = this.time+'ms';
      // 属性
      bg.style.opacity = 0;
      if(this.position=='left'){
        body.style.transform = 'translate(-110%,0)';
      }else if(this.position=='right'){
        body.style.transform = 'translate(110%,0)';
      }else if(this.position=='top'){
        body.style.transform = 'translate(0,-110%)';
      }else if(this.position=='bottom'){
        body.style.transform = 'translate(0,110%)';
      }else{
        body.style.opacity = 0;
        body.style.top = '30%'
      }
      // 更新状态
      setTimeout(()=>{ if(this.show) this.$emit('update:show',false); },this.time);
    },

    /* 控制动画 */
    _animation(show: boolean){
      if(show) setTimeout(()=>{ this._showBody(); },300);
      else this._hideBody();
    },

    /* 点击背景 */
    _clickBG(){
      if(this.bgClose) this._animation(false);
    },

    /* 关闭 */
    close(){
      this._animation(false);
    },

  }
});
</script>
