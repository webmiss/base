import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',  //模式: light(浅色)、dark(深色)
    statusHeight: 0,  //状态栏高度
    socket: null, //Socket
    scan: null, //摄像头
    /* 缓存路由 */
    keepAlive: ['Index'],
    
    // mode: 'light',  // 模式: light、dark
    // statusBarHeight: 0, // 状态栏
    // isLogin: '', // 登录状态
    // uInfo: {}, // 用户信息
    // geolocation:{}, // 定位
    // socket: null, // Socket
    // uMsg: {scroll:null, group:[],num:''}, // 消息
    // uNotify: {},  // 通知
    // scan: null, // 摄像头
    // /* 缓存路由 */
    // keepAlive: ['Index'],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
