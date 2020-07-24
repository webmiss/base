/* 获取星期几 */
export default (day)=>{
  let date=new Date(day);
  let week = ['日','一','二','三','四','五','六'];
  return week[date.getDay()];
}