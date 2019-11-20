
import Env from '@/env'

/* 函数 */
const install = (Vue)=>{
  // 系统标题
  document.title = Env.title;
  // 配置信息
  Vue.prototype.$config = Env;
  // 全局变量
  Vue.prototype.$obj = {
    scan: null,
    setTime: null,
    socket: null,
  };
  /* 正则验证 */
  Vue.prototype.$reg = (name,val)=>{
    let isRight=false;
    let msg='';
    const reg = {
      uname: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/,
      tel: /^[1]\d{10}$/,
      email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      vcode: /^\d{4}$/,
      passwd: /^\w{6,16}$/,
    }
    switch(name){
      case 'uname':
        isRight = reg.uname.test(val);
        msg = !isRight?'用户名英文开头5~16位！':'';
        break;
      case 'tel':
        isRight = reg.tel.test(val);
        msg = !isRight?'手机号码错误！':'';
        break;
      case 'email':
        isRight = reg.email.test(val);
        msg = !isRight?'邮箱帐号错误！':'';
        break;
      case 'vcode':
        isRight = reg.vcode.test(val);
        msg = !isRight?'验证码4位！':'';
        break;
      case 'passwd':
        isRight = reg.passwd.test(val);
        msg = !isRight?'密码为6~16位字符！':'';
        break;
    }
    return isRight?true:msg;
  }
}
export default install;