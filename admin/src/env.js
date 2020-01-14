
/* 本地 */
// const baseUrl = 'http://localhost:8086/';
// const title = '基础系统(本地)';
// const socket = 'ws://127.0.0.1:9010';

/* 基础系统 */
const baseUrl = 'https://data.webmis.vip/';
const title = '基础系统';
const socket = 'wss://webmis.vip/wss';

/* 配置信息 */
export default {
  title: title,
  version: 'v1.0.0',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'admin/',
  themeColor: '#6FB737',
  copy: 'Copyright © WebMIS.vip 2020',
  // 状态栏
  statusBar:{height:'0px',color: '#333', bgColor:'#FFF'},
  // 更新
  update: true,
  upDateColor: {bg:'',logoBg:'#FFF',loading:'#FFF',loaded:'#666',copy:'#333'},
  upIosUrl: 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8',
  // 地图
  amapKey: 'd956f0c3e15489a1b5bf291e5d133c8a',
  // 百度AI
  baiduOcr: 'https://aip.baidubce.com/rest/2.0/ocr/v1/',
  // Socket
  socketServer: socket,
  msgRead: 1000,
  msgNew: 5*60*1000,
  msgContent: 'title',
  msgBrowser: false,
}