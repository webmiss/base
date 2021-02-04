/* 获取日期 */
export default (n: number,day?: any)=>{
  let now = day?new Date(day):new Date();
  now.setDate(now.getDate()+n);
  let y = now.getFullYear();
  let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
  let d = now.getDate()<10?'0'+now.getDate():now.getDate();
  return y+'-'+m+'-'+d;
}