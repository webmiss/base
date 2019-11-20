/* 配置文件 */
// const baseUrl = 'http://localhost:8083/';
const baseUrl = 'https://api.webmis.vip/';
export default {
  title: 'WebMIS',
  version: 'v1.0.0',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'admin/',
  themeColor: '#6FB737',
  copy: 'Copyright © WebMIS.VIP 2019',
  // 状态栏
  statusBar:{height:'env(safe-area-inset-top)',color: '#333', bgColor:'#FFF'},
  // 更新
  update: false,
  upDateColor: {bg:'',logoBg:'#FFF',loading:'#FFF',loaded:'#666',copy:'#333'},
  upIosUrl: 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8',
  // 地图
  amapKey: 'd956f0c3e15489a1b5bf291e5d133c8a',
  // Socket
  socketServer: 'ws://39.108.152.251:9010',
  msgRead: 1000,
  msgNew: 1*60*1000,
  msgContent: 'title',
  msgBrowser: false,
}