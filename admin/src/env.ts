import Storage from './library/Storage'

/* 模式: dev(开发模式) */
const mode: string = '';

/* 接口 */
const language: string = Storage.getItem('language') || '';
const lag: any = language?JSON.parse(language):'';
let baseUrl: string, socket: string;
if(lag && lag.name=='python'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9010/';
    socket = 'ws://localhost:9011/';
  }else{
    baseUrl = 'https://demo-python.webmis.vip/';
    socket = 'wss://demo-python.webmis.vip/wss';
  }
}else if(lag && lag.name=='java'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9020/';
    socket = 'ws://localhost:9020/websocket';
  }else{
    baseUrl = 'https://demo-java.webmis.vip/';
    socket = 'wss://demo-java.webmis.vip/websocket';
  }
}else if(lag && lag.name=='go'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9030/';
    socket = 'ws://localhost:9031/websocket';
  }else{
    baseUrl = 'https://demo-go.webmis.vip/';
    socket = 'wss://demo-go.webmis.vip/websocket';
  }
}else{
  if(mode=='dev'){
    baseUrl = 'http://localhost:9000/';
    socket = 'ws://localhost:9001/';
  }else{
    baseUrl = 'https://demo-php.webmis.vip/';
    socket = 'wss://demo-php.webmis.vip/wss';
  }
}

/* 配置 */
const now = new Date();
export default {
  title: 'WebMIS', // 应用名称
  version: '3.0.0', // 应用版本
  copy: 'Copyright © WebMIS.vip ' + now.getFullYear(),  // 版权信息
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'admin/', //数据接口地址
  tinymceKey: 'dm9pn8sfmiyaalv1r49hvf8ww9x8denshvuhp1tf7z51k6jj',
  /* Token */
  token: '',
  /* 主题 */
  themes: {
    primary:{
      plain:['#595','#C2E7B0','#F0F9EB'],
      dark:['#FFF','#595','#595'],
      // plain:['#409EFF','#D9ECFF','#ECF5FF'],
      // dark:['#FFF','#409EFF','#409EFF'],
    },
    info:{
      plain:['#909399','#E9E9EB','#F4F5F5'],
      dark:['#FFF','#909399','#909399'],
    },
    success:{
      plain:['#67C23A','#E1F3D8','#F0F9EB'],
      dark:['#FFF','#67C23A','#67C23A'],
    },
    warning:{
      plain:['#E6A23C','#FAECD8','#FDF6EC'],
      dark:['#FFF','#E6A23C','#E6A23C'],
    },
    danger:{
      plain:['#F56C6C','#FDE2E2','#FEF0F0'],
      dark:['#FFF','#F56C6C','#F56C6C'],
    },
    border: {
      plain:['#DCDFE6','#C0C4CC','#EBEEF5','#F2F6FC'],
      dark:['#FFF','#CCC','#999','#666'],
    },
    text: {
      plain:['#282828','#606266','#909399','#C0C4CC'],
      dark:['#FFF','#CCC','#999','#666'],
    }
  },
  /* 请求 */
  request: {
    headers: {
      "Content-Type": "application/json;charset=utf-8"  // 表单方式
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
    type: 'admin',
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
