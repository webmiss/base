import Toast from '@/library/ui/ui-toast'

/* 拍照 */
export default (callback,fail)=>{
  try{
    let camera = plus.camera.getCamera();
    camera.captureImage(function(url){
      plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file((file)=>{ callback(file); });
      },(e)=>{
        return Toast('读取拍照失败!');
      });
    },fail);
  }catch(e){
    // 创建文件对象
    let fileObj = document.createElement('input');
    fileObj.setAttribute('type','file');
    fileObj.setAttribute("style",'display: none');
    // 返回文件对象
    document.body.appendChild(fileObj);
    fileObj.click();
    fileObj.onchange = ()=>{
      callback(fileObj.files[0]);
    }
  }
}