import Toast from '@/library/ui/toast'

/* 拍照 */
export default (callback: any, fail?: any)=>{
  try{
    // @ts-ignore
    let camera = plus.camera.getCamera();
    camera.captureImage(function(url: string){
      // @ts-ignore
      plus.io.resolveLocalFileSystemURL(url, function (entry: any) {
        entry.file((file: any)=>{ callback(file); });
      },()=>{
        return Toast('读取拍照失败!');
      });
    },fail);
  }catch(e){
    // 创建文件对象
    const fileObj: any = document.createElement('input');
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