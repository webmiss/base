/* 获取星期几 */
export default (date: string | number | Date)=>{
  const now: Date = new Date(date);
  const week = ['日','一','二','三','四','五','六'];
  return week[now.getDay()];
}