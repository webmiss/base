/* 当前时间戳 */
export default (data: string='')=>{
  let time: any;
  if(data){
    time = new Date(data).getTime();
  }else{
    time = new Date().getTime();
  }
  return Math.round(time/1000).toString();
}