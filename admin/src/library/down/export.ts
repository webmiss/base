/*
* 导出
* param:{data:'', filename:'down.xlsx'}
*/
export default (param: any)=>{
  // 转blob对象
  const blob: Blob = new Blob([param.data],{
    type: "application/octet-stream",
  });
  const blobURL = window.URL.createObjectURL(blob);
  // 创建连接
  const dom = document.createElement('a');
  dom.style.display = 'none';
  dom.href = blobURL;
  dom.setAttribute('download', param.filename);
  if(typeof dom.download === 'undefined'){
    dom.setAttribute('target', '_blank');
  }
  document.body.appendChild(dom);
  dom.click();
  // 清除
  document.body.removeChild(dom);
  window.URL.revokeObjectURL(blobURL);
}