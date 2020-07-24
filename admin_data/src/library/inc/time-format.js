/* 时间格式 */
export default (t)=>{
  let time = t;
  let now = new Date();
  let y = now.getFullYear();
  let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
  let d = now.getDate()<10?'0'+now.getDate():now.getDate();
  // 判断
  let tmp_y = t.substr(0,4);
  let tmp_m = t.substr(5,2);
  let tmp_d = t.substr(8,2);
  let tmp_t1 = t.substr(11,5);
  let tmp_t2 = t.substr(5,11);
  // 时
  let h = parseInt(t.substr(11,2));
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
  }else if(tmp_y==y && tmp_m==m && tmp_d==d-1){
    // 本月
    time = '昨天 '+tmp_t1
  }else if(tmp_y==y && tmp_m==m){
    // 本月
    time = tmp_t2
  }
  return time;
}