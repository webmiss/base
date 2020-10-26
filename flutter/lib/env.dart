
const _title = 'WebMIS-Flutter';
const _baseUrl = 'https://demo-api.webmis.vip/';
const _socket = 'wss://webmis.vip/wss';

class Env {
  static final bool dev = true;  //开发模式
  static final String title = _title;  //应用名称
  static final String version = '1.0.0';  //应用版本
  static final String apiUrl = _baseUrl+'api/'; //数据接口地址
  static final String copy = 'Copyright © WebMIS.VIP 2020'; //版权信息
  /* 主题颜色 */
  static final Map<String,dynamic> color = {
    'primary': '#6FB737',
    'info': '#999999',
  };
  /* 请求 */
  static final Map<String,dynamic> request = {
    'content-type': 'application/x-www-form-urlencoded',
  };
  /* 状态栏 */
  static final Map<String,dynamic> statusBar = {
    'height': 40.0, //默认高度
    'color': '#333333',  //字体颜色
    'bgColor': '#FFFFFF'  //背景颜色
  };
  /* 更新 */
  static final Map<String,dynamic> update = {
    'start': false,  //开启更新
    'bg': '#24292E',  //背景颜色
    'logoBg': '#FFFFFF', //Logo背景
    'loading': '#6FB737',  //加载中
    'loaded': '#000000', //未加载
    'copy': '#666666', //版权颜色
    'msgColor': '#999999', //版权颜色
    'butColor': '#FFFFFF', //按钮颜色
    'butBg': '#6FB737',  //按钮背景
    'butText': '下载并安装' //按钮文字
  };
  // IOS下载链接
  static final String upIosUrl = 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8';
  /* Login */
  static final Map<String,dynamic> login = {
    'start': false,  //Token验证
    'api': 'user/token',  //验证接口
    'uinfo': 'uinfo', //用户信息
  };
  /* Socket */
  static final Map<String,dynamic> socket = {
    'start': false,  //启动
    'server': _socket,  //启动
  };
  /* 高德地图 */
  static final Map<String,dynamic> amap = {
    'start': false,  //开启定位
    'WEB_KEY': 'c526dde052bd47c221103ae04176cc3c',  //WEBAPI
    'JSAPI_KEY': 'd956f0c3e15489a1b5bf291e5d133c8a',  //JSAPI
    'Android_KEY': 'ee4a1c67b5a8720449b09982c740ae8b',  //Android
    'iOS_KEY': '85f24c342342b9206e8e7cf0a84d2298',  //iOS
  };
  /* 支付 */
  static final Map<String,dynamic> pay = {
    'wx_appId': 'wx0eb50a34a0efb967',
    'universalLink': 'https://webmis.vip/app/',
  };
  /* 消息 */
  static final Map<String,dynamic> msg = {
    'content': 'title', //阅读：title(标题)、content(内容)
    'api': 'Usermain/baiduAudio', //声音接口
  };
}