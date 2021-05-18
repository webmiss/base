/* 隐藏 */
export default (tel: string)=>{
  return tel.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}