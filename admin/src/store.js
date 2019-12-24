import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    system: {}, // 系统信息
    uinfo: {},  // 用户信息
    msgNum: 0,  // 消息数
  }
});