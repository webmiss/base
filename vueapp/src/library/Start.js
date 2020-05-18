import Inc from '@/library/Inc'
import Plus from '@/library/Plus'
import Socket from '@/library/Socket'

/* 启动 */
export default {

  /* 初始化 */
  init(){

    /* APP设置 */
    if(Plus.isPlus()){
      // 竖屏
      plus.screen.lockOrientation("portrait-primary");
      // 状态栏
      plus.navigator.setStatusBarStyle('dark');
      plus.navigator.setStatusBarBackground(Env.themeColor);
      Inc.self.$store.state.statusBarHeight = plus.navigator.getStatusbarHeight();
      // 模式
      document.addEventListener("uistylechange",()=>{
        Inc.self.$store.state.mode = plus.navigator.getUiStyle();
       }, false);
      // Android返回键
      let backcount = 0;
      let webview = plus.webview.currentWebview();
      plus.key.addEventListener('backbutton', ()=>{
        webview.canBack((e)=>{
          if(e.canBack){
            // 关闭摄像头
            if(Inc.self.$store.state.scan) Inc.self.$store.state.scan.close();
            // 返回
            Inc.back(1);
          }else{
            if(backcount>0) plus.runtime.quit();
            Inc.toast('再按一次退出应用!');
            backcount++;
            setTimeout(()=>{backcount=0;},2000);
          }
        });
      });
    }else{
      // 浏览器
    }

    /* 登录验证 */
    this.tokenState();
    /* 获取定位 */
    this.geoLocation();
    /* 消息推送 */
    Socket.start();
  },

  /* 登录验证 */
  tokenState(){
    const token = Inc.storage.getItem('token');
    if(token){
      Inc.post('user/token',{token:token,uinfo:1},(res)=>{
        const d = res.data;
        if(d.code==0){
          Inc.self.$store.state.isLogin = true;
          Inc.self.$store.state.uInfo = d.uinfo;
        }else{
          Inc.self.$store.state.isLogin = false;
          Inc.self.$store.state.uInfo = {};
          Inc.storage.setItem('token','');
        }
      });
    }else{
      Inc.self.$store.state.isLogin = false;
      Inc.storage.setItem('token','');
    }
  },

  /* 获取定位 */
  geoLocation(){
    setTimeout(()=>{
      Plus.geoLocation((res)=>{
        Inc.self.$store.state.geolocation = res;
        Inc.storage.setItem('city',res.district);
      },(e)=>{
        setTimeout(()=>{
          Plus.geoLocation((res)=>{
            Inc.self.$store.state.geolocation = res;
            Inc.storage.setItem('city',res.district);
          },(e)=>{});
        },8000);
      });
    },3000);
  },

}