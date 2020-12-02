
const title = 'WebMIS Web';
const baseUrl = 'https://demo-api.webmis.vip/';

export default {
  dev: false, // 开发模式
  title: title, // 应用名称
  baseUrl: baseUrl, // 数据地址
  apiUrl: baseUrl+'/', // 数据接口地址
  copy: 'Copyright © WebMIS.vip 2020',  // 版权信息
  /* 请求 */
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  // 表单方式
    },
  },
}