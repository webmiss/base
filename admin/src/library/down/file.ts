/* File */
export default (url: string, filename: string='down.txt')=>{
  // 创建对象
  let a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  // 点击
  a.click();
  // 移除
  document.body.removeChild(a);
}