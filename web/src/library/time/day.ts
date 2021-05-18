/* 获取日期 */
export default (n: number=0, day?: any)=>{
  const now: Date = day?new Date(day):new Date();
  now.setDate(now.getDate()+n);
  const y: string = ''+now.getFullYear();
  const m: string = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):''+(now.getMonth()+1);
  const d: string = now.getDate()<10?'0'+now.getDate():''+now.getDate();
  return y +'-'+ m +'-'+ d;
}