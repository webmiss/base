/* UI-跳转页面 */
export default (self,url,parm)=>{
  // 参数
  parm = parm || '';
  // 跳转
  return self.$router.push({path:url,query:parm});
}