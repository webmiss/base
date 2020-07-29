import {Post,Storage} from './ui/index'
import {MapGeolocation} from './plus/index'
import Socket from './Socket'

/* 启动 */
export default {

  self: null,

  /* 初始化 */
  init(self){
    this.self = self;
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
          this.self.store.data.isLogin = true;
          if(d.uinfo) this.self.store.data.uInfo = d.uinfo;
          this.self.update();
        }else{
          this.self.store.data.isLogin = false;
          this.self.store.data.uInfo = {};
          this.self.update();
          Storage.setItem('token','');
        }
      });
    }else{
      this.self.store.data.isLogin = false;
      this.self.update();
      Storage.setItem('token','');
    }
  },

  /* 获取定位 */
  geoLocation(){
    MapGeolocation((res)=>{
      this.self.store.data.geolocation = res;
      this.self.update();
      Storage.setItem('city',res.district);
    });
  },

}