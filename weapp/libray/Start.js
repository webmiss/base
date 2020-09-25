import Env from '../env'
import Storage from './ui/storage'
import Post from './ui/request-post'
import MapGeolocation from './plus/map-geolocation'
import Socket from './Socket'

/* 启动 */
export default {

  self: null,

  /* 初始化 */
  init(self){
    this.self = self;
    /* 登录验证 */
    if(Env.login.start){
      this.tokenState(1);
      clearInterval(this.tokenInterval);
      this.tokenInterval = setInterval(()=>{
        this.tokenState(0);
      },10000);
    }
    /* 获取定位 */
    if(Env.amap.start) this.geoLocation();
    /* 消息推送 */
    if(Env.socket.start) Socket.start(this.self);
  },

  /* 登录验证 */
  tokenState(uinfo){
    const token = Storage.getItem('token');
    const city = Storage.getItem('city');
    if(token){
      Post(Env.login.api,{token:token,uinfo:uinfo},(res)=>{
        const d = res.data;
        if(d.code==0){
          this.self.store.data.isLogin = true;
          // 用户信息
          if(d[Env.login.uinfo]){
            this.self.store.data.uInfo = d[Env.login.uinfo];
          }
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