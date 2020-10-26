/* 正式 */
const title = 'WebMIS-微信小程序';
const baseUrl = 'https://demo-api.webmis.vip/';
const socket = 'wss://demo-api.webmis.vip/wss';

export default {
  name: title,  //应用名称
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'api/', //数据接口地址
  keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', //加密字符
  /* 请求 */
  request:{
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'  //表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 地图 */
  amapKey: '12d2caec68d29ea17f3f578d29607d44',  //高德KEY
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgRead: 300, //延迟时间：0(不开启)
  msgContent: 'content',  //阅读：title(标题)、content(内容)
}