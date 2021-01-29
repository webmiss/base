/* 格式化-字节 */
export default (byte)=>{
  let str = (byte/1024).toFixed(2);
  if(str < 1024) {
    str = str + ' KB';
  }else if(str>=1024 && str<1048576){
    str = (str/1024).toFixed(2) + ' M';
  }else if(str>=1048576 && str<1073741824){
    str = (str/1024/1024).toFixed(2) + ' G';
  }
  return str;
}