import Vue from 'vue';
import Env from '@/env'
import VueAMap from 'vue-amap';
import axios from 'axios'

import Notify from '../components/notify/notify';
Vue.use(Notify);

// 初始化地图
VueAMap.initAMapApiLoader({key: Env.amapKey, plugin: ['AMap.Geolocation','PlaceSearch'], v: '1.4.15'});

export default {

  /* Plus加载完成 */
  isPlus(callback){
    document.addEventListener('plusready',callback,false);
  },

  /* 状态栏高度 */
  getStatusBarHeight(){
    let immersed = 0;
    const ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if(ms&&ms.length>=3) immersed=parseFloat(ms[2]);
    return immersed;
  },

  /* 本地消息 */
  notify(title,content,callback){
    /* 浏览器 */
    if(Env.msgBrowser && window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        setTimeout(()=>{
          new Notification(title, {body:content }); 
        },Env.msgRead);
      });
    }
    /* 系统内部 */
    setTimeout(()=>{
      Vue.prototype.$msgNotify({title:title, content:content, delay:10000, onClick:callback});
    },Env.msgRead);
    /* 是否阅读 */
    if(Env.msgRead==0) return;
    // 百度Token
    axios.post(Env.apiUrl+'index/baiduToken').then((res)=>{
      const msgAudio = document.getElementById('msg');
      let text = Env.msgContent=='title'?title:content;
      msgAudio.src = '//tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tex='+text+'&tok='+res.data.token;
      setTimeout(()=>{
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
            msgAudio.play();
          }
        }catch(e){
          msgAudio.play();
        }
      },Env.msgRead);
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
            console.log(d.msg);
          }
        });
      },(e)=>{
        console.log('支付通道: '+e.message);
      });
        
    }catch(e){
      console.log('H5方式: '+pay_type);
    }
  },

  /* 定位 */
  geoLocation(callback,fail){
    try{
      plus.geolocation.getCurrentPosition((res)=>{
        let data = {};
        data.province = res.address.province; 
        data.city = res.address.city;
        data.latitude = res.coords.latitude;
        data.longitude = res.coords.longitude;
        // 保存本地
        window.localStorage.setItem('GeoLocation',JSON.stringify(data));
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
                window.localStorage.setItem('GeoLocation',JSON.stringify(data));
                callback(data);
              }else fail(status);
            });
          });
        });
      },500);
    }
  },

  /* 获取地名信息 */
  getAddress(name,callback,fail){
    setTimeout(()=>{
      AMap.service(['AMap.PlaceSearch'], ()=>{
        let location = window.localStorage.getItem('GeoLocation');
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

  /* 拍照 */
  camera(callback,fail){
    try{
      let camera = plus.camera.getCamera();
      camera.captureImage(function(url){
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },(e)=>{
          console.log("读取拍照失败");
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
            console.log('读取文件: '+e.message);
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
          console.log("读取录像失败");
        });
      },fail);
    }catch(e){console.log('录像');}
  },

  /* 音频 */
  audio(r,callback,fail){
    try{
      r.record({filename: '_doc/audio/'}, function(url) {
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          callback(url,entry);
        },function (e) {
          console.log("读取音频失败");
        });
      },fail);
    }catch(e){console.log('录音');}
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
    }catch(e){console.log('上传文件');}
  },

  /* 系统缓存 */
  cacheClear(){
    try{
      plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
        return entry.removeRecursively();
      },(e)=>{
        console.log('清理缓存失败');
      });
    }catch(e){console.log('清理缓存');}
  },

}