/* 金额-格式化 */
export default (price: string)=>{
  return (parseInt(price).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
}