import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',  //模式: light、dark
    statusBarHeight: 0, //状态栏
    /* 用户 */
    isLogin: '', //登录状态
    uInfo: {}, //用户信息
    system: {}, //系统信息
    /* 菜单 */
    menuName: '',  //用户菜单
    action: {name:'',url:'',action:'',width:'',menus:''}, //动作菜单
    /* 功能 */
    scan: null, //摄像头
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
