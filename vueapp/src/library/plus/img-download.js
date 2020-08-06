import Toast from '@/library/ui/ui-toast'

/* 保存图片 */
export default (url,name,ext)=>{
  const timestamp = name || Date.parse(new Date())/1000;
  ext = ext || 'png';
  try{
    // 手机下载
    let bitmap = new plus.nativeObj.Bitmap();
    bitmap.loadBase64Data(url,()=>{
      let file = '_doc/'+timestamp+'.'+ext;
      bitmap.save(file,{overwrite: true,quality:50},(i)=>{
        plus.gallery.save(file,()=>{
          Toast('已保存到相册!');
        });
      }); 
    },(e)=>{
      Toast('保存失败!');
    });
  }catch(e){
    // 浏览器下载
    let a = document.createElement('a');
    a.href = url;
    a.download = timestamp+'.'+ext;
    document.body.appendChild(a);
    // 点击
    a.click();
    // 移除
    document.body.removeChild(a);
  }
}