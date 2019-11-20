
// const baseUrl = 'http://localhost:8083/';
const baseUrl = 'https://api.webmis.vip/';
export default {
  name: 'WebMIS',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'api/',
  themeColor: '#6FB737',
  // 状态栏
  statusBar:{color: '#333', bgColor:'#FFF'},
  // 地图
  amapKey: '12d2caec68d29ea17f3f578d29607d44',
  // Socket
  socketServer: 'ws://39.108.152.251:9010',
  msgRead: 3000,
  msgNew: 1*60*1000,
  msgContent: 'title',
}