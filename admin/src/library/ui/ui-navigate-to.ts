/* UI-跳转页面 */
export default  (self: any, url: string, parm?: any) : void => {
  // 参数
  parm = parm || '';
  // 跳转
  self.$router.push({path:url,query:parm});
}