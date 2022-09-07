/* Date */
export const DateTime: Function = (format: string='Y-m-d H:i:s', timestamp: number=0)=>{
  // 获取时间
  let time: Date = timestamp>0?new Date(timestamp*1000):new Date();
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

/* 时间戳 */
export const StrToTime: Function = (datetime: string='')=>{
  const arr = datetime.split(' ');
  const num = parseInt(arr[0]);
  let now = new Date().getTime();
  now = Math.round(now/1000);
  let n = 0;
  switch (arr[1]) {
    case 'second': n=num*1; break;
    case 'minute': n=num*60; break;
    case 'hour': n=num*60*60; break;
    case 'day': n=num*60*60*24; break;
    case 'week': n=num*60*60*24*7; break;
    case 'month': n=num*60*60*24*7*30; break;
    case 'year': n=num*60*60*24*365; break;
  }
  return now+n;
}