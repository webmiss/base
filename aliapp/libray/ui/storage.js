export default {
  /* 保存 */
  setItem(key,data){
    return my.setStorage({key:key,data:data});
  },
  /* 获取 */
  getItem(key){
    return my.getStorageSync(key);
  },
  /* 清除 */
  clear(){
    return my.clearStorageSync();
  },
}