import Inc from '@/library/Inc'
import VueAMap from 'vue-amap';

/* 高德地图-初始化 */
VueAMap.initAMapApiLoader({
  key: Inc.config.amapKey,
  plugin: ['AMap.Geolocation','PlaceSearch'],
  v: '1.4.15'
});

export default {

  /* plus */
  isPlus(){
    try{ return plus?true:false; }catch(e){ return false; }
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

  /* 获取定位 */
  geoLocation(callback,fail){
    try{
      plus.geolocation.getCurrentPosition((res)=>{
        let data = {};
        data.province = res.address.province; 
        data.city = res.address.city;
        data.latitude = res.coords.latitude;
        data.longitude = res.coords.longitude;
        // 保存本地
        Inc.storage.setItem('GeoLocation',JSON.stringify(data));
        callback(data);
      },fail);
    }catch(e){
      // 获取定位
      setTimeout(()=>{
        AMap.service(['AMap.Geolocation'], ()=>{
          const geolocation = new AMap.Geolocation({enableHighAccuracy: false,timeout: 5000});
          // 城市信息
          geolocation.getCityInfo((status, result)=>{
            let data = {};
            data.province = result.province;
            data.city = result.city;
            // 经纬度
            geolocation.getCurrentPosition((status, result)=>{
              if(result && result.position){
                data.latitude = result.position.lat;
                data.longitude = result.position.lng;
                // 保存本地
                Inc.storage.setItem('GeoLocation',JSON.stringify(data));
                callback(data);
              }else fail(status);
            });
          });
        });
      },500);
    }
  },
  /* 获取地名 */
  getAddress(name,callback,fail){
    setTimeout(()=>{
      AMap.service(['AMap.PlaceSearch'], ()=>{
        let location = Inc.storage.getItem('GeoLocation');
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

  /* 支付 */
  pay(pay_type,url,data,callback,fail){
    try{
      // APP支付
      if(pay_type=='alipay') data['type']='app';
      else if(pay_type=='wxpay') data['type']='APP';
      // 支付频道
      plus.payment.getChannels((channels)=>{
        let channel = null;
        for(let i in channels){
          if(channels[i].id==pay_type) channel=channels[i];
        }
        // 支付参数
        Inc.post(url,data,(res)=>{
          const d = res.data;
          if(d.code!=0) return Inc.toast(d.msg);
          // 唤起支付
          plus.payment.request(channel,d.data,callback,fail);
        });
      },(e)=>{
        return Inc.toast('支付通道:'+e.message);
      });
    }catch(e){
      return Inc.toast('H5方式:'+pay_type);
    }
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
          return Inc.toast('分享成功!');
        },(e)=>{
          return Inc.toast('分享失败!');
        });
      },(e)=>{
        return Inc.toast('分享错误!');
      });
    }catch(e){
      return Inc.toast('请在APP内使用!');
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
          return Inc.toast('读取拍照失败!');
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
            return Inc.toast('读取文件失败!');
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

  /* 录像 */
  video(callback,fail){
    try{
      let camera = plus.camera.getCamera();
      camera.startVideoCapture(function(url) {
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },(e)=>{
          return Inc.toast('读取录像失败!');
        });
      },fail);
    }catch(e){
      return Inc.toast('请在APP内使用!');
    }
  },

  /* 音频 */
  audio(r,callback,fail){
    try{
      r.record({filename: '_doc/audio/'}, function(url) {
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },function (e) {
          return Inc.toast('读取音频失败!');
        });
      },fail);
    }catch(e){
      return Inc.toast('请在APP内使用!');
    }
  },

  /* 图片压缩(文件对象) */
  readerCompress(fileObj,parm,callback){
    const _self = this;
    try{
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
        _self.compressImage(this.result,parm,callback);
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

  /* 系统缓存 */
  cacheClear(){
    try{
      plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
        return entry.removeRecursively();
      },(e)=>{
        return Inc.toast('清理缓存失败!');
      });
    }catch(e){
      return Inc.toast('请在APP内使用!');
    }
  },

}