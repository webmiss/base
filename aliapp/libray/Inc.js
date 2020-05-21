import Env from '../env'

export default {

  /* 项目 */
  self: null,

  /* 配置 */
  config: Env,

  /* 返回 */
  back(num){ my.navigateBack({data:num}); },

  /* 加载 */
  loading(){
    const load = my.showLoading({content:''});
    return { clear:my.hideLoading };
  },

  /* 提示 */
  toast(text){ return my.showToast({content:text}); },

  /* Get请求 */
  get(url,data,success,fail){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    my.request({
      url: url,
      data: data,
      headers: Env.request.headers,
      success: success,
      fail: fail,
    });
  },

  /* Post请求 */
  post(url,data,success,fail){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    my.request({
      url: url,
      data: data,
      method: 'POST',
      headers: Env.request.headers,
      success: success,
      fail: fail,
    });
  },

  /* 本地硬盘 */
  storage: {
    setItem(key,data){ return my.setStorage({key:key,data:data}); },
    getItem(key){ return my.getStorageSync({key:key}).data; },
    clear(){ return my.clearStorageSync(); },
  },

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

  /* 格式化价格 */
  formatPrice(price){
    return (parseInt(price).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },

  /* 隐藏手机号码 */
  formatTel(tel){
    const reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, '$1****$2');
  },

  /* Url参数 */
  getQueryString(url, name){
    const qrForm = decodeURIComponent(url);
    const reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    const res = qrForm.substr(1).match(reg)
    return res?res[2]:'';
  },

  /* Html转换 */
  getHtml(html){
    return html.replace(/<img/gi, '<img class="all img"')
    .replace(/<ul/gi, '<ul class="all ul"')
    .replace(/<ul/gi, '<p class="all p"');
  },

  /* 定位 */
  getLocation(callback,fail){
    const self = this;
    // 经纬度
    my.getLocation({
      type: 1,
      success (res) {
        const data = {
          longitude: res.longitude,
          latitude: res.latitude,
          province: res.province,
          city: res.city,
          district: res.district,
          address: '',
        };
        self.storage.setItem('geolocation',data);
        callback(data);
      }
    });
  },
  /* 搞德-坐标转换 */
  getCoordinate(longitude,latitude,coordsys,callback){
    this.get(
      'https://restapi.amap.com/v3/assistant/coordinate/convert',
      {locations: longitude+','+latitude, coordsys:coordsys, key:Env.amapWeb},
    (res)=>{
      const d = res.data;
      let longitude = '';
      let latitude = '';
      if(d.status=='1' && d.info=='ok'){
        const arr = d.locations.split(',');
        longitude = arr[0];
        latitude = arr[1];
      }
      callback({ longitude: longitude, latitude: latitude });
    });
  },
  /* 手机第三方地图 */
  openMap(parm){
    const latitude = parm.latitude || 0;
    const longitude = parm.longitude || 0;
    const name = parm.name || '';
    const scale = parm.scale || 16;
    my.openLocation({latitude: latitude, longitude: longitude, name: name, scale: scale});
  },

  /* 照片和相机 */
  photo(callback,fail){
    my.chooseImage({count: 1, success: callback, fail: fail});
  },
  // 照片
  image(callback,fail){
    my.chooseImage({count: 1, sourceType: ['album'], success: callback, fail: fail});
  },
  // 相机
  camera(callback,fail){
    my.chooseImage({count: 1, sourceType: ['camera'], success: callback, fail: fail});
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
    let context = my.createCanvasContext(canvasId);
    my.getImageInfo({
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

  /* 拨打电话 */
  tel(tel) {
    wx.makePhoneCall({ number: tel });
  },

  /* 正则验证 */
  reg(name,val){
    let isRight=false;
    let msg='';
    const reg = {
      uname: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/,
      tel: /^[1]\d{10}$/,
      email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      vcode: /^\d{4}$/,
      passwd: /^[a-zA-Z0-9|_|@|-|*|&]{6,16}$/,
    }
    switch(name){
      case 'uname':
        isRight = reg.uname.test(val);
        msg = !isRight?'用户名英文开头5~16位！':''; break;
      case 'tel':
        isRight = reg.tel.test(val);
        msg = !isRight?'手机号码错误！':''; break;
      case 'email':
        isRight = reg.email.test(val);
        msg = !isRight?'邮箱帐号错误！':''; break;
      case 'vcode':
        isRight = reg.vcode.test(val);
        msg = !isRight?'验证码4位！':''; break;
      case 'passwd':
        isRight = reg.passwd.test(val);
        msg = !isRight?'密码为6~16位字符！':''; break;
    }
    return isRight?true:msg;
  },

  /* Base64 */
  encode(str){
    let encode = encodeURI(str);
    return btoa(encode);
  },
  decode(base64){
    let decode = atob(base64);
    return decodeURI(decode);
  },
  
}