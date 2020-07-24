import Toast from '@/library/inc/ui-toast'

/* 相册 */
export default (callback,fail,multiple)=>{
  multiple = multiple || false;
  try{
    plus.gallery.pick((res)=>{
      const tmpArr = res.files;
      let files = [];
      let sTime = null;
      for(let i in tmpArr){
        plus.io.resolveLocalFileSystemURL(tmpArr[i], function (entry) {
          entry.file((file)=>{
            files.push(file);
            clearTimeout(sTime);
            sTime = setTimeout(()=>{
              callback(files);
            },300);
          });
        },(e)=>{
          return Toast('读取文件失败!');
        });
      }
    },fail,{filter:"image",multiple: multiple});
  }catch(e){
    // 创建文件对象
    let fileObj = document.createElement('input');
    fileObj.setAttribute('type','file');
    fileObj.setAttribute("style",'display: none');
    // 是否多选
    if(multiple) fileObj.setAttribute('multiple','multiple');
    // 返回文件对象
    document.body.appendChild(fileObj);
    fileObj.click();
    fileObj.onchange = ()=>{
      callback(fileObj.files);
    }
  }
}