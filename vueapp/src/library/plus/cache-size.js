/* 缓存-大小 */
let _cacheSize = 0;
const _getCacheSize = (dir)=>{
  plus.io.resolveLocalFileSystemURL(dir,(fs)=>{
    let drc = fs.createReader();
    drc.readEntries((entries)=>{
      for(let i=0; i<entries.length; i++){
        if(entries[i].isDirectory){
          _getCacheSize(entries[i].fullPath);
        }else{
          entries[i].file((e)=>{
            _cacheSize += e.size;
          });
        }
      }
    });
  });
};
import Toast from '@/library/ui/ui-toast'
export default (dir)=>{
  dir = dir || '_doc/';
  try{
    _getCacheSize(dir);
  }catch(e){
    return Toast('请在APP内使用!');
  }
  return _cacheSize;
}