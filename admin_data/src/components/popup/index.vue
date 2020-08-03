<template>
<div v-show="show">
  <div ref="PopupBG" class="wm-popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="clickBG()"></div>
  <div ref="PopupBody" class="wm-popup_body" :style="{backgroundColor:bgColor}"><slot></slot></div>
</div>
</template>

<style scoped>
.wm-popup_bg,.wm-popup_body{position: fixed; z-index: 1000; transition: all .3s ease;}
.wm-popup_bg{width: 100%; height: 100%; top: 0; left: 0; opacity: 0;}
.wm-popup_body{opacity: 0;}
</style>

<script>
export default {
  name:'PopUp',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.7},
    bgClose: {type: Boolean, default: true},
    position: {type: String, default: ''},
    bgColor: {type: String, default: ''},
  },
  data(){
    return {
    }
  },
  watch:{
    show(val){
      if(val) this.showBG(true);
    },
  },
  mounted(){
    let body = this.$refs.PopupBody || '';
    // 默认值
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
  methods:{

    /* 动画 */
    showBG(show){
      setTimeout(()=>{
        let bg = this.$refs.PopupBG || '';
        let body = this.$refs.PopupBody || '';
        // 显示&隐藏
        if(show){
          bg.style.opacity = 1;
          // 位置
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
        }else{
          bg.style.opacity = 0;
          // 位置
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
        }
        // 当前状态
        setTimeout(()=>{ this.$emit('show',show); },300);
      },300);
    },

    /* 点击背景 */
    clickBG(){
      if(this.bgClose) this.showBG(false);
    },

  }
}
</script>
