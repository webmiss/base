import ImgBase64 from './img-base64';
/* 图片压缩 */
export default (canvasId,file,parm,callback,fail)=>{
  // 参数
  let width = parm.width || 0;
  let height = parm.height || 0;
  let quality = parm.quality || 0.8;
  let ext = parm.ext || 'jpg';
  let cut = parm.cut || true;
  let w=1,h=1;
  let dst_x=0,dst_y=0;
  let dst_size = 1;
  let src_size = w/h;
  
  // 图片信息
  wx.getImageInfo({
    src: file,
    success (res){
      let imgSrc = res.path;
      wx.createSelectorQuery()
        .select('#'+canvasId)
        .fields({ node: true, size: true })
        .exec((res1) => {
          let _canvas = res1[0].node;
          let ctx = _canvas.getContext('2d');
          // 宽高计算
          src_size = res.width/res.height;
          // 宽、高、不缩放、等比例
          if(width>0 && height==0){
            w = width<res.width?width:res.width;
            h = width<res.width?Math.round(width/src_size):Math.round(res.width/src_size);
            width = w;
            height = h;
          }else if(width==0 && height>0){
            w = height<res.height?Math.round(height*src_size):Math.round(res.height*src_size);
            h = height<res.height?height:res.height;
            width = w;
            height = h;
          }else if(width==0 && height==0){
            w = res.width;
            h = res.height;
            width = w;
            height = h;
          }else{
            // 比例
            dst_size = width/height;
            if(src_size > dst_size){
              if(width<res.width){
                w = cut?Math.round(height*src_size):width;
                h = cut?height:Math.round(width/src_size);
              }else{
                w = cut?Math.round(res.height*src_size):res.width;
                h = cut?res.height:Math.round(res.width/src_size);
              }
            }else{
              if(height<res.height){
                w = cut?width:Math.round(height*src_size);
                h = cut?Math.round(width/src_size):height;
              }else{
                w = cut?res.width:Math.round(res.height*src_size);
                h = cut?Math.round(res.width/src_size):res.height;
              }
            }
          }
          // 画板高宽
          dst_x = Math.round(width-w)/2;
          dst_y = Math.round(height-h)/2;
          let dpr = wx.getSystemInfoSync().pixelRatio;
          _canvas.width = w;
          _canvas.height = h;
          ctx.scale(dpr, dpr);
          ctx.fillRect(dst_x, dst_y, w, h);
          let img = _canvas.createImage();
          img.src = imgSrc;
          img.onload = (e) => {
            ctx.drawImage(img, dst_x, dst_y, w, h);
            wx.canvasToTempFilePath({
              canvas: _canvas,
              success: (res)=>{
                // console.log(res.tempFilePath);
                if(res.errMsg == "canvasToTempFilePath:ok") callback(ImgBase64(res.tempFilePath));
                else fail(res);
              }
            })
          };
        }
      );
    }
  })
}