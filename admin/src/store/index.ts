import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',      //模式: light(浅色)、dark(深色)
    width: 0,           //宽
    height: 0,          //高
    statusHeight: 0,    //状态栏
    scan: null,         //摄像头
    /* 用户 */
    isLogin: '',        //登录状态
    uInfo: {},          //用户信息
    system: {},         //系统信息
    geolocation: {},    //定位
    socket: null,       //Socket
    /* 菜单 */
    controller: '',
    action: {
      title:'',         //名称
      active:'',        //动作
      menus:[],         //列表
    },
    /* 缓存路由 */
    keepAlive: ['Home'],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})
