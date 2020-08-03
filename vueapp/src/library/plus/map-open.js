import Toast from '@/library/ui/ui-toast'

/* 打开地图 */
export default (dst,src,address)=>{
  try{
    dst = new plus.maps.Point(dst[0],dst[1]);
    src = new plus.maps.Point(src[0],src[1]);
    if(plus.os.name=='iOS'){
      plus.maps.openSysMap(dst,address,src);
    }else if(plus.os.name=='Android'){
      plus.maps.openSysMap(src,address,dst);
    }
  }catch(e){
    return Toast('请在APP内使用!');
  }
}