/* UI-提示 */
export default (text,time)=>{
  time = time || 3000;
  return wx.showToast({title:text,duration:time,icon:'none'});
}