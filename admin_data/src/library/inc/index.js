
import Decode from './base64-decode'
import Encode from './base64-encode'
import ExtType from './base64-ext-type'
import HtmlImg from './html-img'
import HtmlLoad from './html-load'
import PriceFormat from './price-format'
import PriceToFixed from './price-to-fixed'
import Reg from './reg'
import Get from './request-get'
import Post from './request-post'
import Storage from './storage'
import TelFormat from './tel-format'
import TimeDate from './time-date'
import TimeDay from './time-day'
import TimeFormat from './time-format'
import TimeSize from './time-size'
import TimeWeek from './time-week'
import Tinymce from './tinymce'
import Back from './ui-back'
import Loading from './ui-loading'
import Toast from './ui-toast'
import Unique from './unique'
import VersionDiff from './version-diff.js'

/* 全部 */
export default {
  Decode, //Base64-解密
  Encode, //Base64-加密
  ExtType,  //文件类型
  HtmlImg,  //Html获取图片地址
  HtmlLoad, //加载Css&Js
  PriceFormat,  //格式化价格
  PriceToFixed, //金额-不四舍五入
  Reg,  //正则验证
  Get,  //Get请求
  Post, //Post请求
  Storage,  //本地硬盘
  TelFormat,  //格式化手机号码
  TimeDate, //年月日时分秒
  TimeDay,  //获取日期
  TimeFormat, //时间格式
  TimeSize, //时间比较
  TimeWeek, //获取星期几
  Tinymce,  //Tinymce配置
  Back, //UI-返回
  Loading,  //UI-加载
  Toast,  //UI-提示
  Unique, //去数组重复
  VersionDiff,  //版本比较
};
/* 局部 */
export {
  Decode,
  Encode,
  HtmlImg,
  HtmlLoad,
  PriceFormat,
  PriceToFixed,
  Reg,
  Get,
  Post,
  Storage,
  TelFormat,
  TimeDate,
  TimeDay,
  TimeFormat,
  TimeSize,
  TimeWeek,
  Tinymce,
  Back,
  Loading,
  Toast,
  Unique,
  VersionDiff,
}