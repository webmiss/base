import Vue from 'vue';
import Inc from '@/library/Inc'
import VueAMap from 'vue-amap';

// 初始化地图
VueAMap.initAMapApiLoader({key: Inc.config.amapKey, plugin: ['AMap.Geolocation','PlaceSearch'], v: '1.4.15'});

export default {

  /* plus */
  isPlus(){
    try{ return plus?true:false; }catch(e){ return false; }
  },

  /* 版本比较 */
  versionDiff(v1,v2){
    const arr1 = v1.split('.');
    const arr2 = v2.split('.');
    if(parseInt(arr1[0])<parseInt(arr2[0])) return true;
    else if(parseInt(arr1[1])<parseInt(arr2[1])) return true;
    else if(parseInt(arr1[2])<parseInt(arr2[2])) return true;
    else return false;
  },

  /* 分享 */
  share(parm){
    try{
      // 朋友圈、我的好友
      const scene = parm.scene?'WXSceneSession':'WXSceneTimeline';
      // 数据
      let share = {};
      if(parm.id=='weixin'){
        // 小程序
        if(parm.type=='wx' && scene=='WXSceneSession'){
          share = {
            type: 'miniProgram',
            title: parm.title,
            content: parm.content,
            thumbs: parm.img,
            miniProgram:{
              id: Inc.config.wx_id,
              path: parm.wx || 'pages/index/index',
              type: Inc.config.wx_type,
              webUrl: parm.url
            },
            extra:{scene:scene}
          };
        }else{
          // 网页
          share = {
            type:'web',
            title:parm.title,
            content:parm.content,
            thumbs:parm.img,
            href:parm.url,
            extra:{scene:scene}
          };
        }
      }else if(parm.id=='qq'){
        share = {type:'text',title:parm.title,content:parm.content,thumbs:parm.img,href:parm.url};
      }else if(parm.id=='sinaweibo'){
        share = {type:'web',content:parm.content,href:parm.url};
      }
      // 提交
      let service = null;
      plus.share.getServices((s)=>{
        // 服务
        for(let i in s) if(s[i].id == parm.id) service = s[i];
        // 发送
        service.send(share,()=>{
          Vue.prototype.$msgNotify({title:'分享',content:'分享成功！'});
        },(e)=>{
          Vue.prototype.$msgNotify({title:'分享',content:'分享失败！'});
          console.log(JSON.stringify(e));
        });
      },(e)=>{
        Vue.prototype.$msgNotify({title:'分享',content:'分享错误！'});
      });
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 本地消息 */
  notify(title,content,isRead){
    // 浏览器
    if(Inc.config.msgBrowser && window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        new Notification(title, {body:content });
      });
    }
    // 显示消息
    const text = Inc.config.msgContent=='title'?title:content;
    Inc.toast(text);
    /* 是否阅读 */
    isRead = isRead || false;
    if(!isRead) return;
    // 百度语音
    const token = Inc.storage.getItem('token') || '';
    if(!token) return Inc.toast('请先登录!');
    Inc.post('Usermain/baiduAudio',{token:token,text:text},(res)=>{
      const d = res.data;
      if(d.code!=0) return Inc.toast(d.msg);
      // 音频
      const audio = new Audio();
      audio.src = d.url;
      // 播放
      try{
        if(plus.os.name=='iOS'){
          let AVAudioSession = plus.ios.importClass("AVAudioSession"),
          AVAudioSessionObj = AVAudioSession.sharedInstance();
          AVAudioSessionObj.setCategoryerror('AVAudioSessionCategoryPlayback', null);
          AVAudioSessionObj.setActiveerror('YES', null);
          let AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
          let AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
          let AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
          let speech = new AVSpeechSynthesizer();
          let voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
          let utterance = AVSpeechUtterance.speechUtteranceWithString(text);
          utterance.setVoice(voice);
          speech.speakUtterance(utterance);
        }else{
          audio.play();
        }
      }catch(e){
        audio.play();
      }
    });
  },

  /* 支付 */
  pay(pay_type,url,data,callback,fail){
    // 请求参数
    let parmStr = '';
    for(let i in data) parmStr += i+'='+data[i]+'&';
    try{
      // APP支付
      if(pay_type=='alipay') parmStr += 'type=app';
      else if(pay_type=='wxpay') parmStr += 'type=APP';
      // 支付频道
      plus.payment.getChannels((channels)=>{
        let channel = null;
        for(let i in channels){
          if(channels[i].id==pay_type) channel=channels[i];
        }
        // 支付参数
        axios.post(url,parmStr).then((res)=>{
          const d = res.data;
          if(d.code==0){
            // 提交
            plus.payment.request(channel,d.data,callback,fail);
          }else{
            Vue.prototype.$msgNotify({title:'支付',content:d.msg});
          }
        });
      },(e)=>{
        Vue.prototype.$msgNotify({title:'支付',content:'支付通道: '+e.message});
      });
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 定位 */
  geoLocation(callback,fail){
    try{
      plus.geolocation.getCurrentPosition((res)=>{
        let data = {
          province: res.address.province,
          city: res.address.city,
          district: res.address.district,
          longitude: res.coords.longitude,
          latitude: res.coords.latitude,
        };
        // 保存本地
        window.localStorage.setItem('geoLocation',JSON.stringify(data));
        callback(data);
      },fail);
    }catch(e){
      // 获取定位
      setTimeout(()=>{
        AMap.service('AMap.Geolocation',()=>{
          // 经纬度
          const geolocation = new AMap.Geolocation({enableHighAccuracy: false,timeout: 5000});
          geolocation.getCurrentPosition((status, res)=>{
            if(res && res.position){
              let data = {
                province: res.addressComponent.province,
                city: res.addressComponent.city,
                district: res.addressComponent.district,
                longitude: res.position.lng,
                latitude: res.position.lat,
              };
              // 保存本地
              window.localStorage.setItem('geoLocation',JSON.stringify(data));
              callback(data);
            }
          });
        });
      },300);
    }
  },

  /* 获取地名信息 */
  getAddress(name,callback,fail){
    setTimeout(()=>{
      AMap.service(['AMap.PlaceSearch'], ()=>{
        let location = window.localStorage.getItem('geoLocation');
        location = location?JSON.parse(location):{city:'昆明市'};
        const place = new AMap.PlaceSearch({city:location.city});
        place.search(name,(status, result)=>{
          if(result && result.poiList){
            callback(result.poiList.pois);
          }else fail(status);
        });
      });
    },500);
  },

  /* 打开地图 */
  openMap(dst,src,address){
    try{
      dst = new plus.maps.Point(dst[0],dst[1]);
      src = new plus.maps.Point(src[0],src[1]);
      if(plus.os.name=='iOS'){
        plus.maps.openSysMap(dst,address,src);
      }else if(plus.os.name=='Android'){
        plus.maps.openSysMap(src,address,dst);
      }
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 拍照 */
  camera(callback,fail){
    try{
      let camera = plus.camera.getCamera();
      camera.captureImage(function(url){
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          entry.file((file)=>{ callback(file); });
        },(e)=>{
          Vue.prototype.$msgNotify({title:'拍照',content:'读取照片失败！'});
        });
      },fail);
    }catch(e){
      // 创建文件对象
      let fileObj = document.createElement('input');
      fileObj.setAttribute('type','file');
      fileObj.setAttribute("style",'display: none');
      // 返回文件对象
      document.body.appendChild(fileObj);
      fileObj.click();
      fileObj.onchange = ()=>{
        callback(fileObj.files[0]);
      }
    }
  },

  /* 相册 */
  photo(callback,fail,multiple){
    multiple = multiple || true;
    try{
      plus.gallery.pick((res)=>{
        const tmpArr = res.files;
        let files = [];
        let sTime = null;
        for(let i in tmpArr){
          plus.io.resolveLocalFileSystemURL(tmpArr[i], function (entry) {
            entry.file((file)=>{
              files.push(file);
              clearTimeout(sTime);
              sTime = setTimeout(()=>{
                callback(files);
              },300);
            });
          },(e)=>{
            Vue.prototype.$msgNotify({title:'相册',content:'读取文件错误：'+e.message});
          });
        }
      },fail,{filter:"image",multiple: multiple});
    }catch(e){
      // 创建文件对象
      let fileObj = document.createElement('input');
      fileObj.setAttribute('type','file');
      fileObj.setAttribute("style",'display: none');
      // 是否多选
      if(multiple) fileObj.setAttribute('multiple','multiple');
      // 返回文件对象
      document.body.appendChild(fileObj);
      fileObj.click();
      fileObj.onchange = ()=>{
        callback(fileObj.files);
      }
    }
  },

  /* 图片压缩 */
  readerCompress(file,parm,callback){
    const _self = this;
    try{
      let ready = new plus.io.FileReader();
      ready.readAsDataURL(file);
      ready.onloadend = function(){
        // 格式
        if(!parm.ext){
          if(file.type=='image/jpeg') parm.ext = 'jpg';
          else if(file.type=='image/png') parm.ext = 'png';
          else if(file.type=='image/gif') parm.ext = 'gif';
        }
        // 压缩
        _self.compressImage(this.result,parm,callback);
      }
    }catch(e){
      let ready = new FileReader();
      ready.readAsDataURL(file);
      ready.onloadend = function(){
        // 格式
        if(!parm.ext){
          if(file.type=='image/jpeg') parm.ext = 'jpg';
          else if(file.type=='image/png') parm.ext = 'png';
          else if(file.type=='image/gif') parm.ext = 'gif';
        }
        // 压缩
        _self.compressImage(this.result,parm,callback);
      }
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

  /* 录像 */
  video(callback,fail){
    try{
      let camera = plus.camera.getCamera();
      camera.startVideoCapture(function(url) {
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },(e)=>{
          Vue.prototype.$msgNotify({title:'录像',content:'读取录像错误：'+e.message});
        });
      },fail);
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 音频 */
  audio(r,callback,fail){
    try{
      r.record({filename: '_doc/audio/'}, function(url) {
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },function (e) {
          Vue.prototype.$msgNotify({title:'录音',content:'读取音频错误：'+e.message});
        });
      },fail);
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 上传文件 */
  uploader(url,data,callback,progress){
    try{
      let task = plus.uploader.createUpload(url,{method:"POST"},callback);
      for(let i=0; i<data.length; i++){
        if(data[i].type=='file'){
          task.addFile(data[i].val,{key:data[i].key});
        }else if(data[i].type=='data'){
          task.addData(data[i].key, data[i].val);
        }
      }
      task.addEventListener( "statechanged",progress,false);
      task.start();
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

  /* 系统缓存 */
  cacheClear(){
    try{
      plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
        return entry.removeRecursively();
      },(e)=>{
        Vue.prototype.$msgNotify({title:'缓存',content:'清理缓存失败！'});
      });
    }catch(e){
      Vue.prototype.$msgNotify({title:'提示',content:'请在APP内使用！'});
    }
  },

}