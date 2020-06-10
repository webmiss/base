<template>
  <div v-show="show">
    <div ref="PopupBody" class="verticalCenter popup_body"><slot></slot></div>
    <div ref="PopupBG" class="popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="clickBG()"></div>
  </div>
</template>

<style scoped>
.popup_bg,.popup_body{position: fixed; z-index: 1000; transition: all .3s ease;}
.popup_bg{width: 100%; height: 100%; top: 0; left: 0; opacity: 0;}
.popup_body{transform: scale(0.3,0.3);}
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
    opacity: {type: Number, default: 0.8},
    bgClose: {type: Boolean, default: true},
  },
  data(){
    return {
    }
  },
  watch:{
    show(val){
      if(val) this.showBG(1,1);
    },
  },
  mounted(){
  },
  methods:{

    /* 动画 */
    showBG(opacity,scale){
      setTimeout(()=>{
        // 背景
        let bg = this.$refs.PopupBG;
        bg.style.opacity = opacity;
        // 内容
        let body = this.$refs.PopupBody;
        body.style.transform = 'scale('+scale+','+scale+')';
        // 显示/隐藏
        setTimeout(()=>{
          let show = opacity==1?true:false;
          this.$emit('show',show);
        },300);
      },300);
    },

    /* 点击背景 */
    clickBG(){
      if(this.bgClose) this.showBG(0,0.3);
    },

  }
}
</script>
