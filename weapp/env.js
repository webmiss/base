/* 测试 */
const baseUrl = 'http://localhost:8086/';
const socket = 'ws://127.0.0.1:9010/';

/* 正式 */
// const baseUrl = 'https://api.webmis.vip/';
// const socket = 'wss://webmis.vip/wss';

export default {
  name: 'WebMIS',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'api/',
  httpType: 'https://',
  // 请求
  request:{
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
  },
  // 状态栏
  statusBar:{color: '#333', bgColor:'#FFF'},
  // 地图
  amapKey: '12d2caec68d29ea17f3f578d29607d44',
  // Socket
  socketServer: socket,
  msgRead: 300,
  msgContent: 'content',
}