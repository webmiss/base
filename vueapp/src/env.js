/* 测试 */
const title = 'WebMIS(本地)';
const baseUrl = 'http://localhost:8086/';
const socket = 'ws://127.0.0.1:9010/';

/* 正式 */
// const title = 'WebMIS';
// const baseUrl = 'https://api.webmis.vip/';
// const socket = 'wss://webmis.vip/wss';

export default {
  dev: false,
  title: title,
  version: '1.0.0',
  baseUrl: baseUrl,
  apiUrl: baseUrl+'api/',
  copy: 'Copyright © WebMIS.VIP 2020',
  // 请求
  request:{
    headers: {"Content-Type":"multipart/form-data"},
  },
  // 状态栏
  statusBar:{height:50, color: '#333', bgColor:'#FFF'},
  // 更新
  update: true,
  upDateColor: {
    bg: '#6FB737',
    logoBg: '#FFF',
    loading: '#FFF',
    loaded: '#666',
    copy: '#333',
    butColor: '#666',
    butBg: '#FFF',
    butText: '下载并安装'
  },
  upIosUrl: 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8',
  // 地图
  amapKey: 'd956f0c3e15489a1b5bf291e5d133c8a',
  // Socket
  socketServer: socket,
  msgRead: 300,
  msgContent: 'content',
  msgBrowser: false,
  // 小程序( 0-正式版,1-测试版,2-体验版 )
  wx_type: 0,
  wx_id: 'gh_a6ddccd2bb08',
}