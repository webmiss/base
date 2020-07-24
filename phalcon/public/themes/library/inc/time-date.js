/* 年月日时分秒 */
export default ()=>{
  const time = new Date();
  const y = time.getFullYear();
  const m = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1;
  const d = time.getDate()<10?'0'+time.getDate():time.getDate();
  const h = time.getHours()<10?'0'+time.getHours():time.getHours();
  const i = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
  const s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
  return y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
}