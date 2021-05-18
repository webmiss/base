/* 验证 */
export default (reg: RegExp, val: string)=>{
  return reg.test(val);
}