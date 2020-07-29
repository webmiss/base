/* UI-加载 */
export default (time)=>{
  // 10秒后清除
  time = time || 10000;
  const loadingTime = setTimeout(()=>{
    my.hideLoading();
  },time);
  // 显示
  my.showLoading({content:''});
  return { clear:my.hideLoading };
}