/* UI-加载 */
export default (time)=>{
  // 10秒后清除
  time = time || 10000;
  setTimeout(()=>{
    wx.hideLoading();
  },time);
  // 显示
  wx.showLoading({title:''});
  return { clear:wx.hideLoading };
}