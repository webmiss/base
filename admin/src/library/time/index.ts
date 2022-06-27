/* Date */
export const DateTime: Function = (format: string='Y-m-d H:i:s', timestamp: number=0)=>{
  // 获取时间
  const time: Date = new Date();
  const y: string = ''+time.getFullYear();
  const m: string = time.getMonth()+1<10?'0'+(time.getMonth()+1):''+(time.getMonth()+1);
  const d: string = time.getDate()<10?'0'+time.getDate():''+time.getDate();
  const h: string = time.getHours()<10?'0'+time.getHours():''+time.getHours();
  const i: string = time.getMinutes()<10?'0'+time.getMinutes():''+time.getMinutes();
  const s: string = time.getSeconds()<10?'0'+time.getSeconds():''+time.getSeconds();
  // 格式化
  let res: string = format;
  res = res.replace("Y", y);
  res = res.replace("m", m);
  res = res.replace("d", d);
  res = res.replace("H", h);
  res = res.replace("i", i);
  res = res.replace("s", s);
  return res;
}