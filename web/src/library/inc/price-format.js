/* 金额-格式化 */
export default (price)=>{
  return (parseInt(price).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
}