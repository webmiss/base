<template>
  <div class="wm-uploader" @click="upload()">
    <slot></slot>
  </div>
</template>

<style>
.wm-uploader{display: inline-block;}
</style>

<script>
import Loading from '../../library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Post from '../../library/ui/request-post'
export default {
  name:'Table',
  props: {
    url: {type: String, default: ''}, //上传地址
    param: {type: Object, default: {}}, //提交参数
  },
  methods:{

    /* 上传 */
    upload(){
      const fileObj = document.createElement('input');
      fileObj.setAttribute('type','file');
      fileObj.setAttribute("style",'display: none');
      fileObj.setAttribute('multiple','multiple');
      document.body.appendChild(fileObj);
      fileObj.click();
      fileObj.onchange = ()=>{
        // 多选
        for(let i=0; i<fileObj.files.length; i++){
          this.param['up'] = fileObj.files[i];
          // 提交
          Post(this.url,this.param,(res)=>{
            const d = res.data;
            if(d.code==0) Toast('正在上传!');
          },{},{onUploadProgress:(event)=>{
            this.$emit('progress',event);
          }});
        }
      };
    },

  },
}
</script>