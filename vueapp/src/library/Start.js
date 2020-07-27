import {Storage,Post,Back,Toast} from '@/library/ui'
import {PlusReady,MapGeolocation} from '@/library/plus'
import Socket from '@/library/Socket'

/* 启动 */
export default {

  self: null,

  /* 初始化 */
  init(self){
    this.self = self;
    /* APP设置 */
    PlusReady(()=>{
      // 竖屏
      plus.screen.lockOrientation("portrait-primary");
      // 状态栏
      plus.navigator.setStatusBarStyle('dark');
      plus.navigator.setStatusBarBackground('#FFFFFF');
      this.self.$store.state.statusBarHeight = plus.navigator.getStatusbarHeight();
      // 关闭启动图
      setTimeout(()=>{ plus.navigator.closeSplashscreen(); },300);
      // 模式
      document.addEventListener("uistylechange",()=>{
        this.self.$store.state.mode = plus.navigator.getUiStyle();
       }, false);
      // Android返回键
      let backcount = 0;
      let webview = plus.webview.currentWebview();
      plus.key.addEventListener('backbutton', ()=>{
        webview.canBack((e)=>{
          if(e.canBack){
            // 关闭摄像头
            if(this.self.$store.state.scan) this.self.$store.state.scan.close();
            // 返回
            Back(1,this.self);
          }else{
            if(backcount>0) plus.runtime.quit();
            Toast('再按一次退出应用!');
            backcount++;
            setTimeout(()=>{backcount=0;},2000);
          }
        });
      });
    });

    /* 登录验证 */
    this.tokenState(1);
    clearInterval(this.tokenInterval);
    this.tokenInterval = setInterval(()=>{
      this.tokenState(0);
    },10000);
    /* 获取定位 */
    this.geoLocation();
    /* 消息推送 */
    Socket.start(this.self);
  },

  /* 登录验证 */
  tokenState(uinfo){
    const token = Storage.getItem('token');
    if(token){
      Post('user/token',{token:token,uinfo:uinfo},(res)=>{
        const d = res.data;
        if(d.code==0){
          this.self.$store.state.isLogin = true;
          if(d.uinfo) this.self.$store.state.uInfo = d.uinfo;
        }else{
          this.self.$store.state.isLogin = false;
          this.self.$store.state.uInfo = {};
          Storage.setItem('token','');
        }
      });
    }else{
      this.self.$store.state.isLogin = false;
      Storage.setItem('token','');
    }
  },

  /* 获取定位 */
  geoLocation(){
    setTimeout(()=>{
      MapGeolocation((res)=>{
        this.self.$store.state.geolocation = res;
        Storage.setItem('city',res.district);
      },(e)=>{ Toast('获取定位失败!'); });
    },1000);
  },

}