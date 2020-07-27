import Toast from '@/library/ui/ui-toast'

/* 缓存-清理 */
export default ()=>{
  try{
    plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
      return entry.removeRecursively();
    },(e)=>{
      return Toast('清理缓存失败!');
    });
  }catch(e){
    return Toast('请在APP内使用!');
  }
}