/* URL */
export default {
  /* 编码 */
  Encode(data: string){
    return encodeURIComponent(data);
  },
  /* 解码 */
  Decode(data: string){
    return decodeURIComponent(data);
  },
}