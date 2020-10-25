<template>
<div v-if="show" ref="ImgBG" class="imgview_bg" :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
  <!-- 加载 -->
  <div class="imgview_load" v-if="loading">
    <i :class="iconLoading" :style="{color:color}"></i>
  </div>
  <!-- 图片 -->
  <div class="imgview_img"><img id="img" :src="info.src" /></div>
  <!-- 上一页 -->
  <div class="imgview_left" @click="page(-1)">
    <i :class="iconLeft" v-if="index!=0"></i>
  </div>
  <!-- 下一页 -->
  <div class="imgview_right" @click="page(1)">
    <i :class="iconRight" v-if="(index+1)!=imgs.length"></i>
  </div>
  <!-- 信息 -->
  <div class="imgview_info">
    <span class="nowrap">
      <span>名称: {{info.name}}</span>
      <span v-if="info.size">大小: {{info.size}}</span>
      <span>页码: {{index+1}}/{{imgs.length}}</span>
    </span>
  </div>
  <!-- 关闭 -->
  <div class="imgview_close" @click="close()"><i :class="iconClose"></i></div>
  <!-- 全屏 -->
  <div class="imgview_full" @click="Fullscreen()"><i :class="iconFull"></i></div>
</div>
</template>

<style scoped>
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.imgview_load{animation: loading 2s linear 0s infinite; left: 50%; top: 50%; margin: -20px 0 0 -20px;}
.imgview_load i{font-size: 32px; color: #6FB737;}
.imgview_bg{position: fixed; z-index: 1000; width: 100%; height: 100%; top: 0; left: 0; opacity: 0; transition: all .3s ease;}
.imgview_bg i{font-size: 24px;}
.imgview_load,.imgview_close,.imgview_full,.imgview_info,.imgview_left,.imgview_right{position: absolute; z-index: 100;}
.imgview_load,.imgview_close,.imgview_full{cursor: pointer; border-radius: 50%; color: #FFF; text-align: center; width: 40px; height: 40px; line-height: 40px;}
.imgview_img img{left: 50%; top: 50%; transform: translate(-50%,-50%);}
.imgview_img{width: 100%; height: 100%;}
.imgview_img img{transition: all .3s ease; position: absolute;}
.imgview_close{top: 10px; right: 10px;}
.imgview_close:hover{color: #FF6600;}
.imgview_full{bottom: 10px; right: 10px;}
.imgview_info{height: 40px; line-height: 40px; left: 0; right: 0; bottom: 20px; text-align: center;}
.imgview_info .nowrap{border-radius: 20px; padding: 8px 16px; color: #EEE; background-color: rgba(0,0,0,0.3);}
.imgview_info .nowrap span{padding: 0 5px;}
.imgview_left,.imgview_right{top: 0; width: 50%; height: 100%;}
.imgview_left i,.imgview_right i{position: absolute; color: #FFF; top: 50%; transform: translate3d(0,-50%,0);}
.imgview_left{left: 0;}
.imgview_left i{left: 10px;}
.imgview_right{right: 0;}
.imgview_right i{right: 10px;}
</style>

<script>
export default {
  name: 'ImgView',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.7},
    color: {type: String, default: '#6FB737'},
    iconLoading: {type: String, default: 'ui ui_loading'},
    iconLeft: {type: String, default: 'ui ui_left'},
    iconRight: {type: String, default: 'ui ui_right'},
    iconFull: {type: String, default: 'ui ui_full'},
    iconClose: {type: String, default: 'ui ui_close'},
  },
  data(){
    return {
      loading: true,
      index: 0,
      imgs: [],
      info:{src:'',name:'',size:''},
    }
  },
  mounted(){
  },
  methods:{

    /* 打开 */
    open(imgs,index){
      // 数据
      this.imgs = imgs || [];
      this.setImg(index);
      // 背景动画
      setTimeout(()=>{
        let bg = this.$refs.ImgBG;
        if(bg) bg.style.opacity = 1;
      },300);
      /* ESC */
      const self = this;
      document.onkeydown = function(event){
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==27) self.close();
      }
    },

    /* 翻页 */
    page(index){
      index = this.index+index;
      if(index<0 || index>=this.imgs.length) return false;
      this.setImg(index);
    },

    /* 关闭 */
    close(){
      setTimeout(()=>{
        this.$emit('show',false);
      },300);
      // 背景动画
      let bg = this.$refs.ImgBG;
      if(bg) bg.style.opacity = 0;
    },

    /* 图片 */
    setImg(index){
      const self = this;
      this.index = index || 0;
      this.info.src = this.imgs[this.index].src;
      this.info.name = this.imgs[this.index].name;
      this.info.size = this.imgs[this.index].size || '';
      // 动画
      let obj = document.getElementById('img');
      if(obj){
        obj.style.opacity = 0;
        obj.style.width = '0';
        obj.style.height = '0';
      }
      // 是否缩放
      this.loading = true;
      let img = new Image();
      img.src = this.info.src;
      img.onload = function (){
        let w = document.body.clientWidth-20;
        let h = document.body.clientHeight-20;
        let src_size = this.width/this.height;
        let dst_size = w/h;
        let width = 'auto';
        let height = 'auto';
        // 是否缩放
        if(this.width>w || this.height>h){
          if(src_size > dst_size) width = w+'px';
          else height = h+'px';
        }
        // 设置
        setTimeout(()=>{
          self.loading = false;
          obj = document.getElementById('img');
          obj.style.opacity = 1;
          obj.style.width = width;
          obj.style.height = height;
        },300);
      }
    },

    /* 全屏 */
    Fullscreen(){
      let obj = this.$refs.ImgBG;
      if(obj.webkitRequestFullScreen){
        // Chrome
        if(document.webkitIsFullScreen){
          document.webkitCancelFullScreen();
        }else{
          obj.webkitRequestFullScreen();
        }
      }else if(obj.mozRequestFullScreen){
        // Firefox
        if(document.mozFullScreen){
          document.mozCancelFullScreen();
        }else{
          obj.mozRequestFullScreen();
        }
      }else if(obj.msRequestFullscreen){
        // IE11
        if(document.msFullscreenElement){
          document.msExitFullscreen();
        }else{
          obj.msRequestFullscreen();
        }
      }else if(obj.requestFullscreen){
        // W3C
        if(document.exitFullscreen){
          document.exitFullscreen();
        }else{
          obj.requestFullscreen();
        }
      }
    },

  }
}
</script>
