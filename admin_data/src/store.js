import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'light',  // 模式: light、dark
    statusBarHeight: 0, // 状态栏
    isLogin: '', // 登录状态
    uInfo: {}, // 用户信息
    system: {}, // 系统信息
    menus: [],  // 用户菜单
    defaultMenu: '3',  // 默认菜单
    collapseMenu: false,  // 收缩菜单
    socket: null, // Socket
    uMsg: {scroll:null, group:[],num:''}, // 消息
    uNotify: {},  // 通知
    scan: null, // 摄像头
  }
});