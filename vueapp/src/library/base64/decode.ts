/* 解码 */
export default (base64: string)=>{
  return decodeURI(atob(base64));
}