<template>
  <div v-if="show" ref="ImgBG" class="imgview_bg" :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
    <div class="imgview_close" @click="close()"><i class="el-icon-close"></i></div>
    <img class="verticalCenter" :src="img" />
  </div>
</template>

<style scoped>
.imgview_bg{position: fixed; z-index: 1000; width: 100%; height: 100%; top: 0; left: 0; opacity: 0; transition: all .3s ease;}
.imgview_close{position: absolute; z-index: 11; border-radius: 50%; cursor: pointer; font-size: 28px; color: #FFF; text-align: center; width: 48px; height: 48px; line-height: 48px; top: 10px; right: 10px;}
.imgview_close:hover{color: #FF6600;}
.imgview_left{}
</style>

<script>
import Inc from '@/library/Inc'
export default {
  name:'ImageView',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.85},
  },
  data(){
    return {
      index: 0,
      imgs: [],
      img: '',
    }
  },
  mounted(){
  },
  methods:{

    /* 打开 */
    open(imgs,index){
      // 数据
      this.index = index || 0;
      this.imgs = imgs || [];
      this.img = this.imgs[this.index];
      // 宽高
      this.scale();
      // 动画
      setTimeout(()=>{
        let bg = this.$refs.ImgBG;
        bg.style.opacity = 1;
      },300);
    },

    /* 缩放 */
    scale(){
      let img = new Image();
      img.src = this.img;
      img.onload = function (){
        let w = document.body.clientWidth;
        let h = document.body.clientHeight;
        let src_size = this.width/this.height;
        let dst_size = w/h;
        // 是否缩放
        if(this.width>w || this.height>h){
          
          console.log(src_size,dst_size);
        }
      }
    },


    /* 关闭 */
    close(){
      setTimeout(()=>{
        this.$emit('show',false);
      },300);
      // 动画
      let bg = this.$refs.ImgBG;
      bg.style.opacity = 0;
    },

  }
}
</script>
