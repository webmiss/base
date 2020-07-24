/* 保存图片 */
export default (url,name,ext)=>{
  const timestamp = name || Date.parse(new Date())/1000;
  ext = ext || 'png';
  // 创建对象
  let a = document.createElement('a');
  a.href = url;
  a.download = timestamp+'.'+ext;
  document.body.appendChild(a);
  // 点击
  a.click();
  // 移除
  document.body.removeChild(a);
}