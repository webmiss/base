const template = `
<div v-if="show" ref="ImgBG" class="imgview_bg" :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
  <!-- 加载 -->
  <div class="imgview_load" v-if="loading"><i class="icons icon_loading"></i></div>
  <!-- 图片 -->
  <div class="imgview_img"><img id="img" :src="info.src" /></div>
  <!-- 上一页 -->
  <div class="imgview_left" @click="page(-1)">
    <i class="icons icon_left" v-if="index!=0"></i>
  </div>
  <!-- 下一页 -->
  <div class="imgview_right" @click="page(1)">
    <i class="icons icon_right" v-if="(index+1)!=imgs.length"></i>
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
  <div class="imgview_close" @click="close()"><i class="icons icon_close"></i></div>
  <!-- 全屏 -->
  <div class="imgview_full" @click="Fullscreen()"><i class="icons icon_full"></i></div>
</div>
`;
export default {
  template: template,
  name:'ImageView',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.8},
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
    /* ESC */
    const self = this;
    document.onkeydown = function(event){
      let e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==27) self.close();
    }
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
        bg.style.opacity = 1;
      },300);
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
      bg.style.opacity = 0;
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