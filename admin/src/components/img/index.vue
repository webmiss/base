<template>
  <div ref="img" class="wm-img">
    <div v-if="url" :style="{backgroundImage:'url('+url+')',backgroundSize:size}"></div>
    <div v-else class="wm-img_null">
      <i class="ui ui_img" :title="title" :style="{fontSize:icoSize}"></i>
    </div>
  </div>
</template>

<style scoped>
.wm-img{overflow: hidden; border: #DCDFE6 1px solid;}
.wm-img div{width: 100%; height: 100%; background-color: #F6F8FA; color: #666; text-align: center; background-size: cover; background-position: center; background-repeat: no-repeat;}
.wm-img_null i{color: #ABADAF;}
.wm-img_null i:hover{color: #6FB737;}
</style>

<script>
export default {
  name: 'Img',
  props: {
    url: {type: String, default: ''}, //图片地址
    size: {type: String, default: 'cover'}, //背景大小
    width: {type: String, default: '90px'}, //宽
    height: {type: String, default: '40px'},  //高
    radius: {type: String, default: '0px'}, //圆角
    title: {type: String, default: '图片'}, //提示
    icoSize: {type: String, default: '32px'}, //图标大小
  },
  mounted(){
    // 属性
    const img = this.$refs.img.style;
    img.width = this.width;
    img.height = this.height;
    img.lineHeight = this.height;
    img.borderRadius = this.radius;
  },
}
</script>