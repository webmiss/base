export default {
  data: {
    isLogin: '', // 登录状态
    uInfo: {},  // 用户信息
    geolocation:{}, // 定位信息
    socket: null, // Socket
    uMsg: {scroll:null, group:[],num:'',id:'',name:'',msg:[],content:''},  // 消息
    uNotify: {},  // 通知
  }
}