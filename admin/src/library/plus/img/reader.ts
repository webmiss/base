import Compress from './compress'

/* 压缩-对象 */
export default (fileObj: any, parm: any, callback: any)=>{
  try{
    // @ts-ignore
    let ready = new plus.io.FileReader();
    ready.readAsDataURL(fileObj);
    ready.onloadend = function(){
      // 格式
      if(!parm.ext){
        if(fileObj.type=='image/jpeg') parm.ext = 'jpg';
        else if(fileObj.type=='image/png') parm.ext = 'png';
        else if(fileObj.type=='image/gif') parm.ext = 'gif';
      }
      // 压缩
      Compress(this.result, parm, callback);
    }
  }catch(e){
    let ready = new FileReader();
    ready.readAsDataURL(fileObj);
    ready.onloadend = function(){
      // 格式
      if(!parm.ext){
        if(fileObj.type=='image/jpeg') parm.ext = 'jpg';
        else if(fileObj.type=='image/png') parm.ext = 'png';
        else if(fileObj.type=='image/gif') parm.ext = 'gif';
      }
      // 压缩
      Compress(this.result,parm,callback);
    }
  }
}