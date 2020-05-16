import Inc from './Inc'
import Socket from './Socket'

/* 启动 */
export default {

  /* 初始化 */
  init(){
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
          Inc.self.store.data.isLogin = true;
          Inc.self.store.data.uInfo = d.uinfo;
          Inc.self.update();
        }else{
          Inc.self.store.data.isLogin = false;
          Inc.self.store.data.uInfo = {};
          Inc.self.update();
          Inc.storage.setItem('token','');
        }
      });
    }else{
      Inc.storage.setItem('token','');
    }
  },

  /* 获取定位 */
  geoLocation(){
    setTimeout(()=>{
      Inc.getLocation((res)=>{
        Inc.self.store.data.geolocation = res;
        Inc.self.update();
        Inc.storage.setItem('city',res.district);
      },(e)=>{
        setTimeout(()=>{
          Inc.getLocation((res)=>{
            Inc.self.store.data.geolocation = res;
            Inc.self.update();
            Inc.storage.setItem('city',res.district);
          });
        },8000);
      });
    },3000);
  },

}