/* 年月日时分秒 */
export default (n: number=0, day?: any)=>{
  const time: Date = new Date();
  const y: string = ''+time.getFullYear();
  const m: string = time.getMonth()+1<10?'0'+(time.getMonth()+1):''+(time.getMonth()+1);
  const d: string = time.getDate()<10?'0'+time.getDate():''+time.getDate();
  const h: string = time.getHours()<10?'0'+time.getHours():''+time.getHours();
  const i: string = time.getMinutes()<10?'0'+time.getMinutes():''+time.getMinutes();
  const s: string = time.getSeconds()<10?'0'+time.getSeconds():''+time.getSeconds();
  return y +'-'+ m +'-'+ d +' '+ h +':'+ i +':'+ s;
}