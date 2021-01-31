/* Base64-加密 */
export default (base64)=>{
  let decode = atob(base64);
  return decodeURI(decode);
}