import Decode from './base64-decode.js'
import Encode from './base64-encode.js'
import HtmlFormat from './html-format.js'
import HtmlInfo from './html-info.js'
import TelCall from './tel-call.js'
import QrurlAnalysis from './qrurl-analysis.js'
import Power from './power.js'

/* 全部 */
export default {
  Decode, //Base64-解密
  Encode, //Base64-加密
  HtmlFormat, //Html转换
  HtmlInfo, //DOM信息
  TelCall, //拨打电话
  QrurlAnalysis, //二维码地址解析
  Power, //消息订阅授权
}
/* 局部 */
export {
  Decode,
  Encode,
  HtmlFormat,
  HtmlInfo,
  TelCall,
  QrurlAnalysis,
  Power,
}