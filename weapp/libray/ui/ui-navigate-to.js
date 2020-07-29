/* UI-跳转页面 */
export default (url,parm)=>{
  // 参数
  parm = parm || '';
  let str = '?';
  if(parm){
    for(let i in parm) str += `${i}=${parm[i]}&`;
    url += str;
  }
  // 跳转
  return wx.navigateTo({url: url});
}