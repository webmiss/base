/* 金额-不四舍五入 */
export default (val,num)=>{
  let n = '';
  for(let i=0; i<num; i++) n+='0';
  n = parseInt('1'+n);
  return Math.floor(val*n)/n;
}