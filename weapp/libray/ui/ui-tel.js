/* UI-拨号 */
export default (tel)=>{
  wx.makePhoneCall({ phoneNumber:tel });
}