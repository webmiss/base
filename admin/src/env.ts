import Storage from './library/ui/storage'

/* 接口 */
const title = 'WebMIS-后台框架';
const platform: string = Storage.getItem('platform') || '';
const lag: any = platform?JSON.parse(platform):'';
let baseUrl: string, socket: string;
if(lag && lag.name=='python'){
  baseUrl = 'http://localhost:9010/';
  socket = 'ws://localhost:9011/';
  // baseUrl = 'https://demo-python.webmis.vip/';
  // socket = 'wss://demo-python.webmis.vip/wss';
}else if(lag && lag.name=='java'){
  baseUrl = 'http://localhost:9020/';
  socket = 'ws://localhost:9020/websocket';
  // baseUrl = 'https://demo-java.webmis.vip/';
  // socket = 'wss://demo-java.webmis.vip/websocket';
}else if(lag && lag.name=='go'){
  baseUrl = 'http://localhost:9030/';
  socket = 'ws://localhost:9031/websocket';
  // baseUrl = 'https://demo-go.webmis.vip/';
  // socket = 'wss://demo-go.webmis.vip/websocket';
}else{
  baseUrl = 'http://localhost:9000/';
  socket = 'ws://localhost:9001/';
  // baseUrl = 'https://demo-php.webmis.vip/';
  // socket = 'wss://demo-php.webmis.vip/wss';
}

/* 配置 */
export default {
  title: 'WebMIS-后台框架', // 应用名称
  version: '1.0.0', // 应用版本
  copy: 'Copyright © WebMIS.vip 2021',  // 版权信息
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'admin/', //数据接口地址
  /* Token */
  token: '',
  /* 主题 */
  themes: {
    primary: '#6FB737', //主色
    success: '#67C23A', //成功
    warning: '#E6A23C', //警告
    danger: '#F56C6C', //危险
    info: '#909399', //信息
    bgcolor: '#F2F4F8', //背景
    text: '#303133', //主要文字
    text1: '#606266', //常规文字
    text2: '#909399', //次要文字
    text3: '#C0C4CC', //占位文字
    border: '#E2E4E8', //边框色
    border1: '#DCDFE6', //一级边框
    border2: '#E4E7ED', //二级边框
    border3: '#EBEEF5', //三级边框
    border4: '#F2F4F8', //四级边框
  },
  /* 请求 */
  request: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"  // 表单方式
    },
    responseType: 'json', //返回类型
    timeout: 10000, //超时设置
  },
  /* 状态栏 */
  statusBar:{
    height: 48, //默认高度
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 更新 */
  update: {
    start: true,  //开启更新
    bg: '#24292E',  //背景颜色
    logoBg: '#FFFFFF', //Logo背景
    loading: '#6FB737',  //加载中
    loaded: '#000000', //未加载
    copy: '#666666', //版权颜色
    msgColor: '#999999', //提示颜色
    butColor: '#FFFFFF', //按钮颜色
    butBg: '#6FB737',  //按钮背景
    butText: '下载并安装' //按钮文字
  },
  upIosUrl: 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8', //IOS下载链接
  /* Login */
  login: {
    start: true,  //Token验证
    api: 'user/token',  //验证接口
    uinfo: 'uinfo', //用户信息
    time: 30000, //间隔时间
  },
  /* 高德地图 */
  amap: {
    start: true,  //开启定位
    jsapi_key: 'd956f0c3e15489a1b5bf291e5d133c8a',  
  },
  /* Socket */
  socket: {
    type: 'api',
    start: false, //启动
    server: socket, //链接地址
    time: 3000, //重连时间
    heartbeat: 10000, //心跳检测时间
  },
  /* 消息 */
  msg: {
    content: 'content',  //阅读：title(标题)、content(内容)
    browser: false,  //浏览器信息
  },
}
