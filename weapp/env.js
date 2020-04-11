
// const baseUrl = 'http://localhost:8083/';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

const httpType = 'https://';
export default {
  name: 'WebMIS',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'api/',
  themeColor: '#6FB737',
  httpType: httpType,
  // 状态栏
  statusBar:{color: '#333', bgColor:'#FFF'},
  // 地图
  amapKey: '12d2caec68d29ea17f3f578d29607d44',
  // Socket
  socketServer: socket,
  msgRead: 300,
  msgContent: 'content',
}