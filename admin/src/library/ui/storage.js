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
  /* 删除 */
  removeItem(key){
    return window.localStorage.removeItem(key);
  },
  /* 清除 */
  clear(){
    return window.localStorage.clear();
  },
}