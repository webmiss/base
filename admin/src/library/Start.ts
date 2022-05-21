import App from '@/main';
import Env from '@/env'
/* UI组件 */
import Toast from '@/library/ui/toast'
import Storage from '@/library/Storage'
import Post from '@/library/request/post'
import Back from '@/library/ui/back'
/* JS组件 */
import PlusReady from '@/library/plus/ready'
import PlusBack from '@/library/plus/back'
import Socket from '@/library/Socket'

/* 启动设置 */
const state: any = null;
const tokenInterval: any = null;
export default {

  state,
  tokenInterval,

  /* 初始化 */
  init(){
    // 状态
    this.state = App.$store.state;
    this.setSize();
    window.onresize = ()=>{this.setSize();}
    // APP设置
    this.setApp();
    // 登录验证
    if(Env.login.start){
      this.tokenState(1);
      clearInterval(this.tokenInterval);
      this.tokenInterval = setInterval(()=>{
        this.tokenState(0);
      },Env.login.time);
    }
    // 消息推送
    if(Env.socket.start) Socket.start();
  },

  /* 可视区域 */
  setSize() {
    this.state.width = document.body.offsetWidth;
    this.state.height = document.body.offsetHeight;
  },

  /* 登录验证 */
  tokenState(uinfo: any){
    const token = Storage.getItem('token');
    if(token){
      Post(Env.login.api,{token:token,uinfo:uinfo},(res: any)=>{
        const d = res.data;
        if(d.code==0){
          this.state.isLogin = true;
          // 用户信息
          if(d[Env.login.uinfo]){
            this.state.uInfo = d[Env.login.uinfo];
          }
        }else{
          this.logout();
        }
      },()=>{
        this.logout();
      });
    }else{
      this.logout();
    }
  },
  logout(){
    this.state.isLogin = false;
    this.state.uInfo = {};
    Storage.setItem('token','');
    if(Env.socket.start && this.state.socket) this.state.socket.close();
  },

  /* APP设置 */
  setApp(){
    PlusReady(()=>{
      // @ts-ignore 竖屏
      plus.screen.lockOrientation("portrait-primary");
      // @ts-ignore 状态栏
      plus.navigator.setStatusBarStyle('dark');
      // @ts-ignore
      plus.navigator.setStatusBarBackground('#FFFFFF');
      // @ts-ignore
      this.state.statusHeight = plus.navigator.getStatusbarHeight();
      // @ts-ignore 关闭启动图
      setTimeout(()=>{ plus.navigator.closeSplashscreen(); },300);
      // 模式
      document.addEventListener("uistylechange",()=>{
        // @ts-ignore
        this.state.mode = plus.navigator.getUiStyle();
       }, false);
      // Android返回键
      let backcount = 0;
      PlusBack((e: any)=>{
        if(e.canBack){
          // 关闭摄像头
          if(this.state.scan) this.state.scan.close();
          // 返回
          Back(1);
        }else{
          // @ts-ignore
          if(backcount>0) plus.runtime.quit();
          Toast('再按一次退出应用!');
          backcount++;
          setTimeout(()=>{backcount=0;},2000);
        }
      });
    });
  },

}