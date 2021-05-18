import Toast from '../ui/toast'

/* 公共 */
export default (name: string, val: string, isMsg?: boolean)=>{
  isMsg = isMsg || false;
  let isRight=false;
  let msg='';
  // 规则
  const reg = {
    uname: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/,
    tel: /^[1]\d{10}$/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
    vcode: /^\d{4}$/,
    passwd: /^[a-zA-Z0-9|_|@|-|*|&]{6,16}$/,
  }
  // 验证
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
  // 提示
  if(msg && isMsg) Toast(msg);
  // 结果
  return isRight?true:msg;
}