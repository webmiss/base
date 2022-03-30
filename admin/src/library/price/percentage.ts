/* 不四舍五入 */
export default (n1: number, n2: number, fixed: number=2)=>{
  return parseFloat(((n1-n2)/n2*100).toString()).toFixed(fixed);
}