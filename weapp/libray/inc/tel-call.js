/* 拨打电话 */
export default (tel)=>{
  wx.makePhoneCall({ phoneNumber:tel });
}