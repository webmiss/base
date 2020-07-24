/* Base64-加密 */
export default (str)=>{
  let encode = encodeURI(str);
  return btoa(encode);
}