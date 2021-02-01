/* 二维码地址解析 */
export default (url, name) => {
  const qrForm = decodeURIComponent(url);
  const reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
  const res = qrForm.substr(1).match(reg)
  return res ? res[2] : '';
}