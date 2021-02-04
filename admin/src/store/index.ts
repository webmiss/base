import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',  //模式: light(浅色)、dark(深色)
    statusHeight: 0,  //状态栏高度
    scan: null, //摄像头
    isLogin: '', // 登录状态
    uInfo: {}, // 用户信息
    geolocation: {}, // 定位
    socket: null, //Socket
    /* 缓存路由 */
    keepAlive: ['Home'],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
