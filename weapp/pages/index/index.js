import store from '../../store'
import create from '../../libray/create'
import Inc from '../../libray/Inc'
import Start from '../../libray/Start'

// const app = getApp();

create(store,{
  data:{
    /* 状态 */
    isLogin:false,
    uInfo:null,
    socket:null,
    geolocation: null,
    // 底部导航
    tabBar: {active:0,},
    // 导航
    navColor: 0,
    // 图片裁切
    imgData: {width: 100, height: 100},
    // 二维码
    qrCodeSize: 120,
    // 轮播图片
    imgUrls: [
      'https://goss.veer.com/creative/vcg/veer/800water/veer-150270653.jpg',
      'https://goss.veer.com/creative/vcg/veer/800water/veer-300200262.jpg',
      'https://goss.veer.com/creative/vcg/veer/800water/veer-162551332.jpg',
    ]
  },
  onShareAppMessage(res){
    // 分享
    const row = res.target.dataset.row;
    return {title:row.title,path:row.url,imageUrl:row.img};
  },
  onShow(){
  },
  onLoad(e){
    // 项目
    Inc.self = this;
    // 获取参数
    setTimeout(()=>{
      /* 初始化 */
      Start.init();
      /* 扫码 */
      const url = e.q;
      if (url) {
        let type = Inc.getQueryString(url,'name');
      }
      /* 加载数据 */
      this.indexLoad();
    },1000);
  },

  /* 打开链接 */
  openUrl(event){
    const url = event.currentTarget.dataset.url;
    const login = event.currentTarget.dataset.login;
    if(login && !this.data.isLogin) return wx.navigateTo({url: '/pages/user/login'});
    else return wx.navigateTo({url:url});
  },

  /* 切换导航 */
  navTab(e){
    this.setData({['tabBar.active']:e.detail});
  },

  /* 首页滑动 */
  indexScroll(event){
    let top = event.detail.scrollTop;
    let n = 0;
    if(top<10) n=0;
    else if(top>200) n=1;
    else n = top/100/2;
    this.setData({navColor:n});
  },

  /* 首页-下拉刷新 */
  indexRefresh(){
    console.log('刷新');
  },
  /* 首页-上拉加载 */
  indexLoad(){
    console.log('加载');
  },

  /* 定位 */
  getCity(){
    wx.showLoading({title:'正在获取定位'});
    Inc.getLocation((res)=>{
      wx.hideLoading();
      Dialog.alert({title: '定位成功',message: JSON.stringify(res)});
    });
  },

  /* 附近地址 */
  getAddress(){
    wx.showLoading({title:'志远大厦'});
    Inc.getAddress('志远大厦',(res)=>{
      wx.hideLoading();
      Dialog.alert({title: '志远大厦',message: JSON.stringify(res)});
    });
  },

  /* 请求 */
  getPost(){
    wx.showLoading({title:'POST请求'});
    Inc.post(Env.baseUrl+'xxx',{},(res)=>{
      wx.hideLoading();
      Dialog.alert({title: 'POST请求',message: JSON.stringify(res.data)});
    });
  },

  /* 本地存储 */
  getStorage(){
    Inc.storage.setItem('test','测试存储数据');
    let test = Inc.storage.getItem('test');
    Dialog.alert({title: '本地存储',message: test});
  },

  /* 图片裁切 */
  compressImage(){
    Inc.photo((res)=>{
      const img = res.tempFilePaths[0];
      // 画布大小
      wx.getImageInfo({
        src: img,
        success: (res)=>{
          this.setData({
            ['imgData.width']:res.width,['imgData.height']:res.height
          },()=>{
            // 压缩
            Inc.compressImage('compressCanvas',img,{width:200, height: 200},(res)=>{
              console.log(res.tempFilePath);
              wx.previewImage({urls: [res.tempFilePath]});
              // Base64
              let base64 = Inc.toBase64(res.tempFilePath);
              console.log(base64);
            });
          });
        }
      });
    });
  },

  /* 二维码 */
  getQRcode(){
    Inc.qrCode('QRcodeCanvas',{size:this.data.qrCodeSize,text:'https://webmis.vip',logo:'../../imgs/logo.png'},(url)=>{
      console.log(url);
      wx.previewImage({urls: [url]});
    });
  },

  /* 支付 */
  getPay(){
    wx.showLoading({title:'发起支付'});
    wx.login({
      success (res) {
        if(res.code){
          // 支付参数
          Inc.get(Env.apiUrl+'index/wechatPay',{type:'JSAPI',code:res.code},(res)=>{
            wx.hideLoading();
            let d = res.data;
            if(d.code==0){
              console.log(res.data);
              // 支付成功
              d.pay.success = (res)=>{
                console.log(res);
              }
              wx.requestPayment(d.pay);
            }
          });
        }
      }
    });
  },

  /* 打开地图 */
  getMap(){
    wx.navigateTo({url: '/pages/map/map'});
  },

  /* Socket */
  socketStart(){
    // 重启Socket
    clearInterval(this.msgInterval);
    this.msgInterval = setInterval(()=>{
      if(this.data.isLogin && (!this.data.socket || this.data.socket.readyState!=1)) this.socketStart();
    },3000);
    // Token
    const token = Inc.storage.getItem('token');
    if(!token) return false;
    // 数据中心-Token
    Inc.post(Env.apiUrl+'Usermain/centreToken',{token:token},(res)=>{
      if(res.data.code==0) this.socket(res.data.token,res.data.uid);
    });
  },
  socket(token,uid){
    this.store.data.socket = wx.connectSocket({url:Env.socketServer+'?token='+token+'&uid='+uid});
    this.update();
    /* 链接 */
    wx.onSocketOpen(()=>{
      console.log('消息系统');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          wx.sendSocketMessage({data:JSON.stringify({type:''})});
        }catch(e){
          this.closeMsg();
        }
      },10000);
      // 获取消息组
      setTimeout(()=>{
        wx.sendSocketMessage({data:JSON.stringify({type:'group',uid:this.store.data.uInfo.uid})});
      },1000);
    });
    /* 关闭 */
    wx.onSocketClose(()=>{
      console.log('消息关闭');
      this.closeMsg();
    });
    /* 接收 */
    wx.onSocketMessage((e)=>{
      const msg = JSON.parse(e.data);
      // 消息组
      if(msg.code==0 && msg.type=='group'){
        // 重置
        this.store.data.uMsg.group = [];
        this.update();
        // 赋值
        this.store.data.uMsg.group = msg.data;
        this.update();
        // 消息数
        this.getMsgNum();
      }else if(msg.code==0 && msg.type=='msg'){
        // 声音提示
        if(msg.gid!='1' && msg.fid!=this.data.uInfo.uid){
          // 是否声音
          let voice = Inc.storage.getItem('voice');
          voice = voice!='1'?false:true;
          Inc.notify(msg.data.title,msg.data.content,voice);
        }
        // 追加消息
        let fid = msg.uid==this.data.uInfo.uid?msg.fid:msg.uid;
        if(this.data.uMsg.group[''+fid]){
          this.store.data.uMsg.group[''+fid].msg.push(msg.data);
          this.update();
          // 刷新滑动
          if(this.store.data.uMsg.id){
            const num = this.store.data.uMsg.msg.length;
            this.store.data.uMsg.id = 'item'+num;
            this.update();
            // 标记已读
            Inc.post(
              Env.apiUrl+'msg/state',
              {token:Inc.storage.getItem('token'),id:msg.data.id,state:1},
            (res)=>{
              const d = res.data;
            });
          }else{
            // 记录数量
            this.store.data.uMsg.group[''+fid].num++;
            this.store.data.uMsg.num++;
            this.update();
          }
        }else{
          setTimeout(()=>{
            wx.sendSocketMessage({data:JSON.stringify({type:'group',uid:this.store.data.uInfo.uid})});
          },1000);
        }
      }
    });
  },
  /* 消息数 */
  getMsgNum(){
    const data = this.data.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    this.store.data.uMsg.num = num;
    this.update();
  },
  /* 关闭 */
  closeMsg(){
    if(this.store.data.socket){
      wx.closeSocket();
      this.store.data.socket = null;
      this.store.data.uMsg.group = [];
      this.store.data.uMsg.num = '';
      this.update();
    }
  },

});