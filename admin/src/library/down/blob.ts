/*
* Blob下载
*/
export default (data: any='', filename: string='down.txt')=>{
  // 转blob对象
  const blob: Blob = new Blob([data],{
    type: "application/octet-stream",
  });
  const blobURL = window.URL.createObjectURL(blob);
  // 创建连接
  const dom = document.createElement('a');
  dom.style.display = 'none';
  dom.href = blobURL;
  dom.setAttribute('download', filename);
  if(typeof dom.download === 'undefined'){
    dom.setAttribute('target', '_blank');
  }
  document.body.appendChild(dom);
  dom.click();
  // 清除
  document.body.removeChild(dom);
  window.URL.revokeObjectURL(blobURL);
}