
const title = 'WebMIS-VueAPP';
const baseUrl = 'https://demo-api.webmis.vip/';
const socket = 'wss://demo-api.webmis.vip/wss';

module.exports = {
  dev: false, //开发模式
  title: title, //应用名称
  keywords: 'WebMIS,Vue混合型APP',
  description: 'WebMIS全栈开发基础框架.技术,PHP,Python,SpringBoot,Phalcon,Flutter,NodeJS,Vue,Swoole,Redis,API',
  version: '1.0.0', //应用版本
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'api/', //数据接口地址
  copy: 'Copyright © WebMIS.VIP 2021',  //版权信息
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
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  //表单方式
    },
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
  },
  /* 高德地图 */
  amap: {
    start: true,  //开启定位
    jsapi_key: 'd956f0c3e15489a1b5bf291e5d133c8a',  
  },
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgContent: 'content',  //阅读：title(标题)、content(内容)
  msgBrowser: false,  //浏览器信息
  /* 小程序 */
  wx_type: 0, //正式版(0)、测试版(1)、体验版(2)
  wx_id: 'gh_a6ddccd2bb08', // 应用ID
}