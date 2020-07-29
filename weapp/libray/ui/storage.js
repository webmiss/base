export default {
  /* 保存 */
  setItem(key,data){
    return wx.setStorage({key:key,data:data});
  },
  /* 获取 */
  getItem(key){
    return wx.getStorageSync(key);
  },
  /* 清除 */
  clear(){
    return wx.clearStorageSync();
  },
}