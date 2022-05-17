/* 模式: dev(开发) */
const mode: string = '';

/* 接口 */
let baseUrl: string = '';
if(mode=='dev'){
  baseUrl = 'http://localhost:9000';
} else {
  baseUrl = 'https://demo-php.webmis.vip/';
}

/* 配置 */
export default {
  title: 'WebMIS 全栈开发基础框架', // 应用名称
  version: '1.0.0', // 应用版本
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl,  //接口
  copy: 'Copyright © webmis.vip 2022',  // 版权信息
  /* 主题 */
  themes: {
    primary:{
      plain:['#595','#C2E7B0','#F0F9EB'],
      dark:['#FFF','#595','#595'],
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
  /* 消息 */
  msg: {
    content: 'content',  //阅读：title(标题)、content(内容)
    browser: false,  //浏览器信息
  },
}
