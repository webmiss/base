/* 编码 */
export default (data: string)=>{
  return btoa(encodeURI(data));
}