/* 相册 */
export default (callback,fail,num)=>{
  num = num || 1;
  wx.chooseImage({count: num, sourceType: ['album'], success: callback, fail: fail});
}