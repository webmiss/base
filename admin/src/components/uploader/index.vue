<template>
  <div class="wm-uploader" @click="upload()">
    <slot></slot>
  </div>
</template>

<style>
.wm-uploader{display: inline-block;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../../library/ui/toast'
import Post from '../../library/request/post'
export default defineComponent({
  name:'UpLoader',
  props: {
    url: {type: String, default: ''},     //上传地址
    name: {type: String, default: 'up'},  //上传名称
    param: {type: Object, default: {}},   //提交参数
  },
  methods:{

    /* 上传 */
    upload(){
      const fileObj: any = document.createElement('input');
      fileObj.setAttribute('type','file');
      fileObj.setAttribute("style",'display: none');
      fileObj.setAttribute('multiple','multiple');
      document.body.appendChild(fileObj);
      fileObj.click();
      fileObj.onchange = ()=>{
        // 多选
        for(let i=0; i<fileObj.files.length; i++){
          this.param[this.name] = fileObj.files[i];
          // 表单
          let form = new FormData();
          for(let i in this.param) form.append(i,this.param[i]);
          // 提交
          Post(this.url, form, (res: any)=>{
            const d = res.data;
            this.$emit('upload',d);
          },()=>{
            Toast('网络加载错误!');
          },{
            onUploadProgress:(event: any)=>{
              this.$emit('progress',event);
            }
          });
        }
      };
    },

  },
});
</script>