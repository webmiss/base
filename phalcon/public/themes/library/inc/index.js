
import Decode from './base64-decode.js'
import Encode from './base64-encode.js'
import ExtType from './base64-ext-type.js'
import HtmlDownImg from './html-down-img.js'
import HtmlImg from './html-img.js'
import HtmlLoad from './html-load.js'
import PriceFormat from './price-format.js'
import PriceToFixed from './price-to-fixed.js'
import Reg from './reg.js'
import TelFormat from './tel-format.js'
import TimeDate from './time-date.js'
import TimeDay from './time-day.js'
import TimeFormat from './time-format.js'
import TimeSize from './time-size.js'
import TimeWeek from './time-week.js'
import Unique from './unique.js'
import VersionDiff from './version-diff.js'

/* 全部 */
export default {
  Decode, //Base64-解密
  Encode, //Base64-加密
  ExtType,  //文件类型
  HtmlDownImg,  //保存图片
  HtmlImg,  //Html获取图片地址
  HtmlLoad, //加载Css&Js
  PriceFormat,  //格式化价格
  PriceToFixed, //金额-不四舍五入
  Reg,  //正则验证
  TelFormat,  //格式化手机号码
  TimeDate, //年月日时分秒
  TimeDay,  //获取日期
  TimeFormat, //时间格式
  TimeSize, //时间比较
  TimeWeek, //获取星期几
  Unique, //去数组重复
  VersionDiff,  //版本比较
};
/* 局部 */
export {
  Decode,
  Encode,
  ExtType,
  HtmlDownImg,
  HtmlImg,
  HtmlLoad,
  PriceFormat,
  PriceToFixed,
  Reg,
  TelFormat,
  TimeDate,
  TimeDay,
  TimeFormat,
  TimeSize,
  TimeWeek,
  Unique,
  VersionDiff,
}