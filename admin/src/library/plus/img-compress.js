/* 压缩-图片 */
export default (file,parm,callback)=>{
  // 参数
  let width = parm.width || 0;
  let height = parm.height || 0;
  let cut = parm.cut || true;
  let quality = parm.quality || 0.8;
  let ext = parm.ext || 'jpg';
  const mimeType = {jpg:'image/jpeg',png:'image/png',gif:'image/gif'};
  let w=1,h=1;
  let dst_x=0,dst_y=0;
  let dst_size = 1;
  let src_size = w/h;
  // 图片信息
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let img = new Image();
  img.src = file;
  img.onload = function () {
    src_size = this.width/this.height;
    // 宽、高、不缩放、等比例
    if(width>0 && height==0){
      w = width<this.width?width:this.width;
      h = width<this.width?Math.round(width/src_size):Math.round(this.width/src_size);
      width = w;
      height = h;
    }else if(width==0 && height>0){
      w = height<this.height?Math.round(height*src_size):Math.round(this.height*src_size);
      h = height<this.height?height:this.height;
      width = w;
      height = h;
    }else if(width==0 && height==0){
      w = this.width;
      h = this.height;
      width = w;
      height = h;
    }else{
      // 比例
      dst_size = width/height;
      if(src_size > dst_size){
        if(width<this.width){
          w = cut?Math.round(height*src_size):width;
          h = cut?height:Math.round(width/src_size);
        }else{
          w = cut?Math.round(this.height*src_size):this.width;
          h = cut?this.height:Math.round(this.width/src_size);
        }
      }else{
        if(height<this.height){
          w = cut?width:Math.round(height*src_size);
          h = cut?Math.round(width/src_size):height;
        }else{
          w = cut?this.width:Math.round(this.height*src_size);
          h = cut?Math.round(this.width/src_size):this.height;
        }
      }
    }
    // 画板高宽
    canvas.width = width;
    canvas.height = height;
    dst_x = Math.round(width-w)/2;
    dst_y = Math.round(height-h)/2;
    context.drawImage(this, dst_x, dst_y, w, h);
    let data = canvas.toDataURL(mimeType[ext],quality);
    callback(data);
  }
}