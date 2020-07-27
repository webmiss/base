import Toast from '@/library/ui/ui-toast'

/* 录像 */
export default (callback,fail)=>{
  try{
    let camera = plus.camera.getCamera();
    camera.startVideoCapture(function(url) {
      plus.io.resolveLocalFileSystemURL(url, function (entry) {
        callback(url,entry);
      },(e)=>{
        return Toast('读取录像失败!');
      });
    },fail);
  }catch(e){
    return Toast('请在APP内使用!');
  }
}