/* 正式 */
const title = 'WebMIS API';
const baseUrl = 'https://api.webmis.vip/';

export default {
  dev: false, // 是否开发模式
  title: title, // 应用名称
  version: '1.0.0', // 应用版本
  baseUrl: baseUrl, // 数据地址
  apiUrl: baseUrl+'api/', // 数据接口地址
  copy: 'Copyright © WebMIS.vip 2020',  // 版权信息
  /* 请求 */
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  // 表单方式
    },
  },
}