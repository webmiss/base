import Get from './request-get.js'
import Post from './request-post.js'
import Storage from './storage.js'
import Tinymce from './tinymce.js'
import Back from './ui-back.js'
import Loading from './ui-loading.js'
import Toast from './ui-toast.js'

/* 全部 */
export default {
  Get,  //Get请求
  Post, //Post请求
  Storage,  //本地硬盘
  Tinymce,  //Tinymce配置
  Back, //UI-返回
  Loading,  //UI-加载
  Toast,  //UI-提示
};
/* 局部 */
export {
  Get,
  Post,
  Storage,
  Tinymce,
  Back,
  Loading,
  Toast,
}