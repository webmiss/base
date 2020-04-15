import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 模式: light、dark
    mode: 'light',
    // 状态栏
    statusBar: {height:0},
    // 用户信息
    isLogin: false,
    uInfo: {},
    // 定位
    geolocation:{},
    // Socket
    socket: null,
    // 消息数
    uMsg: {scroll:null, group:[],num:''},
    // APP信息
    app:{width: window.innerWidth, height: window.innerHeight},
  }
});