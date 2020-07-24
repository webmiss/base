/* 获取图片地址 */
export default (html)=>{
  const reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
  let imgs = [];
  let tem = null;
  while (tem=reg.exec(html)) imgs.push(tem[2]);
  return imgs;
}