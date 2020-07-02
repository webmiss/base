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
    this.tokenState(1);
    clearInterval(this.tokenInterval);
    this.tokenInterval = setInterval(()=>{
      this.tokenState(0);
    },10000);
    /* 消息推送 */
    Socket.start();
    /* 系统信息 */
    this.getConfig();
  },

  /* 登录验证 */
  tokenState(uinfo){
    const token = Inc.storage.getItem('token');
    if(token){
      Inc.post('user/token',{token:token,uinfo:uinfo},(res)=>{
        const d = res.data;
        if(d.code==0){
          Inc.self.$store.state.isLogin = true;
          if(d.uinfo) Inc.self.$store.state.uInfo = d.uinfo;
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

  /* 系统信息 */
  getConfig(){
    Inc.post('index/getConfig',{},(res)=>{
      const d = res.data;
      if(d.code==0) Inc.self.$store.state.system = d.list;
    });
  },

}