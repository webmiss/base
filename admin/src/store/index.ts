import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',  //模式: light(浅色)、dark(深色)
    statusHeight: 0,  //状态栏高度
    scan: null, //摄像头
    /* 用户 */
    isLogin: '', // 登录状态
    uInfo: {}, // 用户信息
    system: {}, //系统信息
    geolocation: {}, // 定位
    socket: null, //Socket
    /* 菜单 */
    menuName: '',  //用户菜单
    action: {name:'',url:'',action:'',width:'',menus:''}, //动作菜单
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
