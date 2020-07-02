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

});