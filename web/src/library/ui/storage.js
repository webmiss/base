/* 本地硬盘 */
export default {
  /* 保存 */
  setItem(key,data){
    return window.localStorage.setItem(key,data);
  },
  /* 获取 */
  getItem(key){
    return window.localStorage.getItem(key);
  },
  /* 清除 */
  clear(){
    return window.localStorage.clear();
  },
}