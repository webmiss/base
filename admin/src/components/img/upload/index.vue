<template>
  <div class="wm-upload" @click="upImage()">
    <slot></slot>
  </div>
</template>

<style scoped>
.wm-upload{cursor: pointer; display: inline-block;}
</style>

<script>
import Loading from '../../../library/ui/ui-loading'
import Toast from '../../../library/ui/ui-toast'
import Post from '../../../library/ui/request-post'
import Camera from '../../../library/plus/camera'
import ImgReader from '../../../library/plus/img-reader'
export default {
  name:'Img',
  props: {
    url: {type: String, default: ''},
    width: {type: Number, default: 200},
    height: {type: Number, default: 200},
    param: {type: Object, default: {}},
  },
  methods:{

    /* 上传图片 */
    upImage(){
      Camera((fileObj)=>{
        // 压缩
        ImgReader(fileObj,{width:this.width,height:this.height},(base64)=>{
          if(!this.url) return Toast('上传Url地址为空!');
          const load = Loading();
          this.param.base64 = base64;
          Post(this.url,this.param,(res)=>{
            load.clear();
            const d = res.data;
            this.$emit('upload',d);
            return Toast(d.msg);
          });
        });
      });
    }

  },
}
</script>