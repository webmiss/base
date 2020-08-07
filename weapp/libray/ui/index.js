import Get from './request-get.js'
import Post from './request-post.js'
import Storage from './storage.js'
import Back from './ui-back.js'
import Loading from './ui-loading.js'
import NavigateTo from './ui-navigate-to.js'
import Tel from './ui-tel.js'
import Toast from './ui-toast.js'

/* 全部 */
export default {
  Get,  //Get请求
  Post, //Post请求
  Storage,  //本地硬盘
  Back, //UI-返回
  Loading,  //UI-加载
  NavigateTo, //跳转页面
  Tel,  //UI-拨号
  Toast,  //UI-提示
}
/* 局部 */
export {
  Get,
  Post,
  Storage,
  Back,
  Loading,
  NavigateTo,
  Tel,
  Toast,
}