<template>
  <div ref="img" class="wm-img" :title="title">
    <div v-if="url" :style="{backgroundImage:'url('+url+')',backgroundSize:size}"></div>
    <div v-else class="wm-img_null">
      <i class="ui ui_img" :style="{fontSize:icoSize}"></i>
    </div>
  </div>
</template>

<style scoped>
.wm-img{overflow: hidden; border: #DCDFE6 1px solid;}
.wm-img:hover{border-color: #6FB737; box-shadow: 0 0 4px rgba(0,0,0,.1);}
.wm-img:hover i{color: #6FB737;}
.wm-img div{width: 100%; height: 100%; background-color: #F6F8FA; color: #666; text-align: center; background-size: cover; background-position: center; background-repeat: no-repeat;}
.wm-img_null i{color: #ABADAF;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Img',
  props: {
    url: {type: String, default: ''},         //图片地址
    size: {type: String, default: 'cover'},   //背景大小
    width: {type: String, default: '90px'},   //宽
    height: {type: String, default: '40px'},  //高
    radius: {type: String, default: '0px'},   //圆角
    title: {type: String, default: ''},       //提示
    icoSize: {type: String, default: '32px'}, //图标大小
  },
  mounted(){
    // 属性
    const img: any = this.$refs.img;
    img.style.width = this.width;
    img.style.height = this.height;
    img.style.lineHeight = this.height;
    img.style.borderRadius = this.radius;
  },
});
</script>