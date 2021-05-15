/* 开发 */
// const baseUrl: string = 'http://localhost:9000';

/* 正式 */
const baseUrl: string = 'https://demo-php.webmis.vip/';

export default {
  title: 'WebMIS 全栈开发基础框架', // 应用名称
  version: '1.0.0', // 应用版本
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl,  //接口
  copy: 'Copyright © WebMIS.vip 2021',  // 版权信息
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
}
