
## 添加文件

```javascript
/* 正式 */
const title = '基础框架';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

export default {
  dev: false, // 是否开发模式
  title: title, // 应用名称
  version: '1.0.0', // 应用版本
  baseUrl: baseUrl, // 数据地址
  apiUrl: baseUrl+'admin/', // 数据接口地址
  copy: 'Copyright © WebMIS.vip 2020',  // 版权信息
  /* 请求 */
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  // 表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    height:'0px', // 默认高度
    color: '#333',  // 字体颜色
    bgColor:'#FFF'  // 背景颜色
  },
  /* 更新 */
  update: {
    start: true,  // 开启更新
    bg: '#6FB737',  // 背景颜色
    logoBg: '#FFF', // Logo背景
    loading: '#FFF',  // 加载中
    loaded: '#666', // 未加载
    copy: '#333', // 版权颜色
    butColor: '#666', // 按钮颜色
    butBg: '#FFF',  // 按钮背景
    butText: '下载并安装' // 按钮文字
  },
  upIosUrl: '', // IOS下载链接
  /* 地图 */
  amapKey: '',  // 高德JSKEY
  /* 百度AI */
  baiduOcr: 'https://aip.baidubce.com/rest/2.0/ocr/v1/',  // 语音识别接口
  /* Socket */
  socket: {
    start: false, // 启动
    server: socket, // 链接地址
  },
  /* 消息阅读 */
  msgRead: 300, // 延迟时间：0(不开启)
  msgContent: 'content',  // 阅读：title(标题)、content(内容)
  msgBrowser: false,  // 浏览器信息
}
```