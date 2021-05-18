/* 时间格式化 */
export default (date: string)=>{
  let time = date;
  // 现在
  const now: Date = new Date();
  const y: string = ''+now.getFullYear();
  const m: string = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):''+(now.getMonth()+1);
  const d: string = now.getDate()<10?'0'+now.getDate():''+now.getDate();
  // 判断
  const tmp_y = date.substr(0,4);
  const tmp_m = date.substr(5,2);
  const tmp_d = date.substr(8,2);
  const tmp_t1 = date.substr(11,5);
  const tmp_t2 = date.substr(5,11);
  // 时
  const h = parseInt(date.substr(11,2));
  // 当天
  if(tmp_y==y && tmp_m==m && tmp_d==d){
    let str = '';
    if(h<6) str='凌晨';
    else if(h<9) str='早上';
    else if(h<12) str='上午';
    else if(h<14) str='中午';
    else if(h<17) str='下午';
    else if(h<20) str='晚上';
    time = str+' '+tmp_t1;
  }else if(tmp_y==y && tmp_m==m && tmp_d==''+(Number(d)-1)){
    // 本月
    time = '昨天 '+tmp_t1
  }else if(tmp_y==y && tmp_m==m){
    // 本月
    time = tmp_t2
  }
  return time;
}