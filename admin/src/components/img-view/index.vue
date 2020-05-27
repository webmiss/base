<template>
  <div v-if="show" ref="ImgBG" class="imgview_bg" :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
    <!-- 加载 -->
    <div class="imgview_load" v-if="loading"><i class="el-icon-loading"></i></div>
    <!-- 图片 -->
    <img id="img" class="imgview_img verticalCenter" :src="info.src" :style="{width:info.width,height:info.height}" />
    <!-- 上一页 -->
    <div class="imgview_left" @click="page(-1)"></div>
    <!-- 下一页 -->
    <div class="imgview_right" @click="page(1)"></div>
    <!-- 信息 -->
    <div class="imgview_info flex_center">
      <div class="nowrap">
        <span>名称: {{info.name}}</span>
        <span>大小: {{info.size}}</span>
        <span>页码: {{index+1}}/{{imgs.length}}</span>
      </div>
    </div>
    <!-- 关闭 -->
    <div class="imgview_close" @click="close()"><i class="el-icon-close"></i></div>
  </div>
</template>

<style scoped>
.imgview_bg{position: fixed; z-index: 1000; width: 100%; height: 100%; top: 0; left: 0; opacity: 0; transition: all .3s ease;}
.imgview_load,.imgview_close,.imgview_info,.imgview_left,.imgview_right{position: absolute; z-index: 100;}
.imgview_load,.imgview_close{cursor: pointer; border-radius: 50%; font-size: 28px; color: #FFF; text-align: center; width: 48px; height: 48px; line-height: 48px; }
.imgview_img{transition: all .3s ease;}
.imgview_load{left: 0; right: 0; top: 0; bottom: 0; margin: auto;}
.imgview_close{top: 10px; right: 10px;}
.imgview_close:hover{color: #FF6600;}
.imgview_info{height: 40px; line-height: 40px; left: 0; right: 0; bottom: 20px;}
.imgview_info div{border-radius: 20px; padding: 0 20px; color: #FFF; background-color: rgba(0,0,0,0.5);}
.imgview_info span{padding: 0 5px;}
.imgview_left,.imgview_right{top: 0; width: 50%; height: 100%;}
.imgview_left{left: 0;}
.imgview_right{right: 0;}
</style>

<script>
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
      loading: false,
      index: 0,
      imgs: [],
      info:{src:'',name:'',width:'0px',height:'0px',size:''},
    }
  },
  mounted(){
  },
  methods:{

    /* 打开 */
    open(imgs,index){
      // 默认
      this.imgs = imgs || [];
      this.setImg(index);
      // 背景动画
      setTimeout(()=>{
        let bg = this.$refs.ImgBG;
        bg.style.opacity = 1;
      },300);
    },

    /* 图片 */
    setImg(index){
      this.index = index || 0;
      this.info.src = this.imgs[this.index].path+this.imgs[this.index].name;
      this.info.name = this.imgs[this.index].name;
      this.info.size = this.imgs[this.index].size;
      // 宽高
      this.scale();
    },

    /* 翻页 */
    page(index){
      index = this.index+index;
      if(index<0 || index>=this.imgs.length) return false;
      this.setImg(index);
    },

    /* 缩放 */
    scale(){
      let self = this;
      // 动画
      let obj = document.getElementById('img');
      if(obj){
        obj.style.opacity = 0;
        obj.style.width = '0';
        obj.style.height = '0';
      }
      // 获取图片
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

    /* 关闭 */
    close(){
      setTimeout(()=>{
        this.$emit('show',false);
      },300);
      // 背景动画
      let bg = this.$refs.ImgBG;
      bg.style.opacity = 0;
    },

  }
}
</script>
