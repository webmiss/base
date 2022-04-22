/* 格式化-小时 */
export default {
  encode(second: number){
    let t1: string = '00';
    let t2: string = '00';
    let t3: string = '00';
    let t: number = 0;
    // 小时
    if(second >= 3600){
      t = Math.floor(second/3600);
      t1 = t>=10?t.toString():'0'+t;
      second -= t*3600;
    }
    // 分钟
    if(second >= 60){
      t = Math.floor(second/60);
      t2 = t>=10?t.toString():'0'+t;
      second -= t*60;
    }
    // 秒
    t = second;
    t3 = t>=10?t.toString():'0'+t;
    return t1+':'+t2+':'+t3;
  },
  decode(time: string){
    let arr: any = time.split(':')
    return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2]);
  },
}