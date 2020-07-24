/* 隐藏手机号码 */
export default (tel)=>{
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, '$1****$2');
}