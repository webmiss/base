import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statusBar:{height:'0px'}, // 状态栏
    system: {}, // 系统信息
    uInfo: {},  // 用户信息
    socket: null, // 即时通信
    msgNum: 0,  // 消息数
  }
});