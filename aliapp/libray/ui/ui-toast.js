/* UI-提示 */
export default (text,time)=>{
  time = time || 3000;
  return my.showToast({content:text,duration:time});
}