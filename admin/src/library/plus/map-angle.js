/* 坐标转角度 */
export default (x,y)=>{
  let l = Math.sqrt(x*x + y*y);
  let a = Math.acos(x/l);
  let res = parseInt(a*180/Math.PI);
  if(x==0 && y==0) return 0;
  else if(x>=0 && y>=0) return -res;
  else if(x<0 && y>=0) return -res;
  return res;
}