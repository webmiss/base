import Decode from './base64-decode.js'
import Encode from './base64-encode.js'
import HtmlFormat from './html-format.js'
import HtmlInfo from './html-info.js'
import TelCall from './tel-call.js'

/* 全部 */
export default {
  Decode, //Base64-解密
  Encode, //Base64-加密
  HtmlFormat, //Html转换
  HtmlInfo, //DOM信息
  TelCall,  //拨打电话
}
/* 局部 */
export {
  Decode,
  Encode,
  HtmlFormat,
  HtmlInfo,
  TelCall,
}