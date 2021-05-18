/* 不四舍五入 */
export default (price: number, num: number)=>{
  let n: string = '';
  for(let i=0; i<num; i++) n+='0';
  let m: number = parseInt('1'+n);
  return Math.floor(price*m)/m;
}