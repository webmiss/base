/* 时间比较 */
export default (t,n)=>{
  let now = n?new Date(n).getTime():new Date().getTime();
  const last = new Date(t).getTime();
  return now-last;
}