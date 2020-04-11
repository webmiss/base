export default {
  data: {
    // 用户信息
    isLogin: false,
    uInfo: {},
    // 定位
    geolocation:{},
    // Socket
    socket: null,
    // 消息数
    uMsg: {scroll:null, group:[],num:'',id:'',name:'',msg:[],content:''},
  }
}