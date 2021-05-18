/* Base64 */
export default {

  /* 编码 */
  encode(data: string) {
    return btoa(encodeURI(data))
  },

  /* 解码 */
  decode(base64: string) {
    return decodeURI(atob(base64))
  },

  /* 类型 */
  getType(ext: string) {
    let type: string='';
    if(ext=='jpg' || ext=='jpeg') type='data:image/jpeg;base64,';
    else if(ext=='png') type='data:image/png;base64,';
    else if(ext=='gif') type='data:image/gif;base64,';
    return type;
  },

}