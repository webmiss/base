import Toast from '@/library/ui/ui-toast'

/* 音频 */
export default (r,callback,fail)=>{
  try{
    r.record({filename: '_doc/audio/'}, function(url) {
      plus.io.resolveLocalFileSystemURL(url, function (entry) {
        callback(url,entry);
      },function (e) {
        return Toast('读取音频失败!');
      });
    },fail);
  }catch(e){
    return Toast('请在APP内使用!');
  }
}