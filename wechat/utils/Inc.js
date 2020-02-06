import Config from '../config'
import QRCode from './weapp-qrcode'
import amap from './amap-wx'
import Notify from '../ui/notify/notify'

const Map = new amap.AMapWX({ key: Config.amapKey});

export default {

  /* 去数组重复 */
  unique(arr){
    let data = [];
    for(let i=0,l=arr.length; i<l; i++) {
      for(var j=i+1; j<l; j++) if (arr[i] === arr[j]) j = ++i;
      data.push(arr[i]);
    }
    return data;
  },

  /* 获取日期 */
  getDay(n,day){
    let now = day?new Date(day):new Date();
    now.setDate(now.getDate()+n);
    let y = now.getFullYear();
    let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
    let d = now.getDate()<10?'0'+now.getDate():now.getDate();
    return y+'-'+m+'-'+d;
  },
  /* 获取星期几 */
  getWeek(day){
    let date=new Date(day);
    let week = ['日','一','二','三','四','五','六'];
    return week[date.getDay()];
  },
  /* 年月日时分秒 */
  getDate(){
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth()+1<10?'0'+time.getMonth()+1:time.getMonth()+1;
    const d = time.getDate()<10?'0'+time.getDate():time.getDate();
    const h = time.getHours()<10?'0'+time.getHours():time.getHours();
    const i = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
    const s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
  },

  /* 本地消息 */
  notify(title,content){
    setTimeout(()=>{
      Notify({type: 'success', message: content});
    },Config.msgRead);
    // 是否阅读
    if(Config.msgRead==0) return;
    // 百度Token
    this.post(Config.apiUrl+'index/baiduToken',{},(res)=>{
      let msgAudio = wx.getBackgroundAudioManager();
        msgAudio.title = title;
        let text = Config.msgContent=='title'?title:content;
        msgAudio.src = Config.httpType+'tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tex='+text+'&tok='+res.data.token;
        setTimeout(()=>{ msgAudio.play(); },Config.msgRead);
    });
  },

  /* 高德定位 */
  getLocation(callback,fail){
    Map.getRegeo({
      success(res){
        callback({
          latitude: res[0].latitude,
          longitude: res[0].longitude,
          province: res[0].regeocodeData.addressComponent.province,
          city: res[0].regeocodeData.addressComponent.city,
          district: res[0].regeocodeData.addressComponent.district,
          address: res[0].name
        });
      },
      fail: fail,
    });
  },
  /* 手机第三方地图 */
  openMap(parm){
    const latitude = parm.latitude || 0;
    const longitude = parm.longitude || 0;
    const name = parm.name || '';
    const scale = parm.scale || 16;
    wx.openLocation({latitude: latitude, longitude: longitude, name: name, scale: scale});
  },

  /* 获取地名信息 */
  getAddress(name,callback,fail){
    Map.getInputtips({
      keywords: name,
      success(res){
        callback(res.tips);
      },
      fail: fail,
    });
  },

  /* 照片和相机 */
  photo(callback,fail){
    wx.chooseImage({count: 1, success: callback, fail: fail});
  },
  // 照片
  image(callback,fail){
    wx.chooseImage({count: 1, sourceType: ['album'], success: callback, fail: fail});
  },
  // 相机
  camera(callback,fail){
    wx.chooseImage({count: 1, sourceType: ['camera'], success: callback, fail: fail});
  },

  /* 二维码 */
  qrCode(canvasId,parm,callback,fail){
    // 参数
    const size = parm.size || 120;
    const text = parm.text || '';
    const padding = parm.padding || 5;
    const logo = parm.logo || '';
    const logoSize = parm.logoSize || 30;
    const logoAlign = size/2-logoSize/2;
    // 生成
    QRCode({
      canvasId: canvasId,
      text: text,
      width: size-padding*2,
      height: size-padding*2,
      x: padding,
      y: padding,
      image: {imageResource: logo, dWidth: logoSize, dHeight: logoSize, dx: logoAlign, dy: logoAlign},
      callback(){
        wx.canvasToTempFilePath({
          canvasId: canvasId,
          width: size,
          height: size,
          fileType: 'jpg',
          success(res){
            callback(res.tempFilePath);
          },
          fail: fail,
        });
      }
    });
  },

  /* Get请求 */
  get(url,data,callback,fail){
    wx.request({
      url: url,
      data: data,
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: callback,
      fail: fail,
    });
  },

  /* Post请求 */
  post(url,data,callback,fail){
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: callback,
      fail: fail,
    });
  },

  /* 本地硬盘 */
  storage: {
    setItem(key,data){
      return wx.setStorage({key:key,data:data});
    },
    getItem(key){
      return wx.getStorageSync(key);
    },
    clear(){
      return wx.clearStorageSync();
    },
  },

  /* 转Base64 */
  toBase64(file){
    return wx.getFileSystemManager().readFileSync(file, "base64");
  },

  /* 图片压缩 */
  compressImage(canvasId,file,parm,callback){
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
    let context = wx.createCanvasContext(canvasId);
    wx.getImageInfo({
      src: file,
      success (res){
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
        context.drawImage(res.path, dst_x, dst_y, w, h);
        context.draw(false, data=>{
          wx.canvasToTempFilePath({
            canvasId: canvasId,
            fileType: ext,
            width: width,
            height: height,
            quality: quality,
            success: callback
          });
        });
      }
    });
  },

  /* 大小单位 */
  getSize(size){
    if(size>=1024*1024*1024){
      return (size/1024/1024/1024).toFixed(2)+' GB';
    }else if(size>=1024*1024){
      return (size/1024/1024).toFixed(2)+' MB';
    }else if(size>=1024){
      return (size/1024).toFixed(2)+' KB';
    }else{
      return size+' B';
    }
  },

}