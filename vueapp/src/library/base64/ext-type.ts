/* 类型 */
export default (ext: string)=>{
  let type: string='';
  if(ext=='jpg' || ext=='jpeg') type='data:image/jpeg;base64,';
  else if(ext=='png') type='data:image/png;base64,';
  else if(ext=='gif') type='data:image/gif;base64,';
  return type;
}