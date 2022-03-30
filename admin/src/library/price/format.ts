/* 格式化-金额 */
export default {
  encode(price: string, fixed: number=2){
    return (parseFloat(price).toFixed(fixed).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
  },
  decode(price: string, fixed: number=2){
    return parseFloat(price.replace(/,/g,'')).toFixed(fixed);
  },
}