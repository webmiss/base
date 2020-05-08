import Env from '../env'

export default {

  /* 配置信息 */
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
  get(url,data,callback){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    my.request({
      url: url,
      data: data,
      headers: Env.request.headers,
      success: callback,
      fail(e){
        my.showToast({content:'请检测网络'});
      },
    });
  },

  /* Post请求 */
  post(url,data,callback){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    my.request({
      url: url,
      data: data,
      method: 'POST',
      headers: Env.request.headers,
      success: callback,
      fail(e){
        my.showToast({content:'请检测网络'});
      },
    });
  },

  /* 本地硬盘 */
  storage: {
    setItem(key,data){ return my.setStorage({key:key,data:data}); },
    getItem(key){ return my.getStorageSync(key); },
    clear(){ return my.clearStorageSync(); },
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
  
}