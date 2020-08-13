/* 拍照 */
export default (callback,fail)=>{
  wx.chooseImage({count: 1, sourceType: ['camera'], success: callback, fail: fail});
}