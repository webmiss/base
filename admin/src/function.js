/*
* 配置文件
*/
export default function install(Vue){

  // 公共
  Vue.prototype.$fun = {

    /* 定位 */
    geolocation(callback){
      try{
        plus.geolocation.watchPosition(callback);
      }catch(e){console.log('定位');}
    },

    /* 拍照 */
    camera(callback){
      try{
        let camera = plus.camera.getCamera();
        camera.captureImage(function(url){
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(url,entry);
          },function (e) {
            console.log("读取拍照失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('拍照');}
    },

    /* 相册 */
    photo(callback){
      try{
        plus.gallery.pick(function(paths){
          callback(paths);
        });
      }catch(e){console.log('相册');}
    },

    /* 录像 */
    video(callback){
      try{
        let camera = plus.camera.getCamera();
        camera.startVideoCapture(function(url) {
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(url,entry);
          },function (e) {
            console.log("读取录像失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('录像');}
    },

    /* 音频 */
    audio(r,callback){
      try{
        r.record({filename: '_doc/audio/'}, function(url) {
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(url,entry);
          },function (e) {
            console.log("读取音频失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('录音');}
    },

    /* 图片压缩 */
    readerCompress(file,parm,callback){
      const _self = this;
      const ready=new FileReader();
      ready.readAsDataURL(file);
      ready.onload=function(){
        // 格式
        if(!parm.ext){
          if(file.type=='image/jpeg') parm.ext = 'jpg';
          else if(file.type=='image/png') parm.ext = 'png';
          else if(file.type=='image/gif') parm.ext = 'gif';
        }
        // 压缩
        _self.compressImage(this.result,parm,callback);
      }
    },
    compressImage(file,parm,callback){
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
    },

    /* 上传文件 */
    uploader(url,data,callback,progress){
      try{
        let task = plus.uploader.createUpload(url,{method:"POST"},callback);
        for(let i=0; i<data.length; i++){
          if(data[i].type=='file'){
            let res = task.addFile(data[i].val,{key:data[i].key});
          }else if(data[i].type=='data'){
            task.addData(data[i].key, data[i].val);
          }
        }
        task.addEventListener( "statechanged",progress,false);
        task.start();
      }catch(e){console.log('上传文件');}
    },

    /* 系统缓存 */
    cacheClear(){
      try{
        plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
          return entry.removeRecursively();
        }, function(e) {
          console.log('清理缓存失败');
        });
      }catch(e){console.log('清理缓存');}
    },

  }
}