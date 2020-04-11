import Env from '@/env'
import Plus from '@/library/Plus'

import Vue from 'vue';
import { Button,Toast } from 'vant';
import 'vant/lib/button/style'
import 'vant/lib/toast/style'
Vue.use(Button).use(Toast);

export default {
  watch:{
    $route(to,from){
      // 页面切换
      this.transitionName = this.$router.isBack?'slide-right':'slide-left';
      this.$router.isBack = false;
    }
  },
  data(){
    return {
      keepAlive: 10,
      // 切换动画
      transitionName: '',
      // 更新APP
      update: {show:false, os:'', down:false, loading:'0%', msg:'检测更新', file:'', total:0},
      upDateColor: Env.upDateColor,
      // 新消息
      msgInterval: null,
    }
  },
  mounted(){
    // 初始化
    setTimeout(()=>{this.init()},1000);
    // 登录状态
    const token = this.$storage.getItem('token');
    if(token){
      this.$ajax.post(
        this.$config.apiUrl+'user/token','token='+token+'&type=info'
      ).then((res)=>{
        const d = res.data;
        if(d.code==0){
          this.$store.state.isLogin = true;
          this.$store.state.uInfo = d.userinfo;
        }else{
          this.$storage.setItem('token','');
        }
      });
    }else{
      this.$storage.setItem('token','');
    }
    // 定位-5秒刷新
    setTimeout(()=>{
      Plus.geoLocation((res)=>{
        this.$store.state.geolocation = res;
        this.$storage.setItem('city',res.district);
      },(e)=>{
        setTimeout(()=>{
          Plus.geoLocation((res)=>{
            this.$store.state.geolocation = res;
            this.$storage.setItem('city',res.district);
          },(e)=>{});
        },8000);
      });
    },3000);
    // 消息推送
    this.socketStart();
  },
  methods:{

    /* 初始化 */
    init(){
      try{
        plus
        // 竖屏
        plus.screen.lockOrientation("portrait-primary");
        // 状态栏
        plus.navigator.setStatusBarStyle('dark');
        plus.navigator.setStatusBarBackground(Env.themeColor);
        Env.statusBar.height = Plus.getStatusBarHeight()+'px';
        // Android返回键
        let backcount = 0;
        let webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', ()=>{
          webview.canBack((e)=>{
            if(e.canBack){
              this.$router.goBack(-1);
              // 关闭项目
              if(this.$obj.scan) this.$obj.scan.close();
            }else{
              if(backcount>0) plus.runtime.quit();
              Toast('再按一次退出应用!');
              backcount++;
              setTimeout(()=>{backcount=0;},2000);
            }
          });
          // 更新
          if(Env.update) this.isUpdate();
        });
      }catch(e){
        // 浏览器
      }
    },

    /* 检测更新 */
    isUpdate(){
      this.update.os = plus.os.name;
      this.$ajax.post(
        this.$config.apiUrl+'index/appUpdate',
        'os='+this.update.os
      ).then((res)=>{
        let d = res.data;
        if(d.code!=0) return false;
        // 是否更新
        plus.runtime.getProperty(plus.runtime.appid,(app)=>{
          if(d.version == app.version) return false;
          this.update.show = true;
          this.update.down = true;
          this.update.msg = '新版本: '+d.version+'&nbsp;&nbsp;大小: '+(d.size/1024/1024).toFixed(2)+'MB';
          this.update.file = this.$config.baseUrl+d.file;
          this.update.total = d.size;
        });
      });
    },

    /* 下载更新 */
    updateDown(){
      this.update.down = false;
      this.update.msg = '开始下载';
      this.update.loading = '0%';
      if (this.update.os == 'iOS') {
        // 苹果手机
        this.update.msg = '请在桌面查看安装进度';
        window.open(Env.upIosUrl);
        // 关闭APP
        setTimeout(()=>{
          plus.runtime.quit();
        },5000);
      }else{
        // 安卓手机
        let down = plus.downloader.createDownload(this.update.file, {
          'filename':'_doc/download/',
          'timeout': 30,
        },(d, status)=>{
          if(status == 200){
            // 安装并重启
            plus.runtime.install(d.filename, {force:true},()=>{
              plus.runtime.restart();
            },(e)=>{
              Toast('安装失败!');
            });
          }else{
            this.update.down = true;
            this.update.msg = '下载失败';
          }
        });
        // 开始任务
        down.start();
        // 下载进度
        down.addEventListener('statechanged',(res, status)=>{
          let complete = parseInt(res.downloadedSize/this.update.total*100);
          this.update.loading = complete+'%';
          this.update.msg = '正在下载：'+this.update.loading;
          if (complete >= 100) this.update.msg = '下载完成，安装并重启';
        });
      }
    },

    /* Socket */
    socketStart(){
      // 重启Socket
      clearInterval(this.msgInterval);
      this.msgInterval = setInterval(()=>{
        if(this.$store.state.isLogin && (!this.$store.state.socket || this.$store.state.socket.readyState!=1)) this.socketStart();
      },3000);
      // Token
      const token = this.$storage.getItem('token');
      if(!token) return false;
      // 数据中心-Token
      this.$ajax.post(
        this.$config.apiUrl+'Usermain/centreToken','token='+token
      ).then((res)=>{
        if(res.data.code==0) this.socket(res.data.token,res.data.uid);
      });
    },
    socket(token,uid){
      this.$store.state.socket = new WebSocket(Env.socketServer+'?token='+token+'&uid='+uid);
      /* 链接 */
      this.$store.state.socket.onopen = ()=>{
        console.log('消息系统');
        // 心跳包
        clearInterval(this.heartbeat);
        this.heartbeat = setInterval(()=>{
          try{
            this.$store.state.socket.send(JSON.stringify({type:''}));
          }catch(e){
            this.closeMsg();
          }
        },10000);
        // 获取消息组
        setTimeout(()=>{
          this.$store.state.socket.send(JSON.stringify({type:'group',uid:this.$store.state.uInfo.uid}));
        },1000);
      }
      /* 关闭 */
      this.$store.state.socket.onclose = ()=>{
        console.log('消息关闭');
        this.closeMsg();
      }
      /* 接收 */
      this.$store.state.socket.onmessage = (e)=>{
        const msg = JSON.parse(e.data);
        // 消息组
        if(msg.code==0 && msg.type=='group'){
          this.$store.state.uMsg.group = [];
          this.$store.state.uMsg.group = msg.data;
          // 消息数
          this.getMsgNum();
        }else if(msg.code==0 && msg.type=='msg'){
          // 声音提示
          if(msg.gid!='1' && msg.fid!=this.$store.state.uInfo.uid){
            // 是否声音
            let voice = window.localStorage.getItem('voice');
            voice = voice!='1'?false:true;
            Plus.notify(msg.data.title,msg.data.content,(obj)=>{
              obj.close();
            },voice);
          }else if(msg.gid=='1'){
            Plus.notify(msg.data.title,msg.data.content,(obj)=>{
              obj.close();
            });
          }
          // 追加消息
          let fid = msg.uid==this.$store.state.uInfo.uid?msg.fid:msg.uid;
          if(this.$store.state.uMsg.group[''+fid]){
            this.$store.state.uMsg.group[''+fid].msg.push(msg.data);
            // 刷新滑动
            if(this.$store.state.uMsg.scroll){
              setTimeout(()=>{
                this.$store.state.uMsg.scroll.refresh();
                const y = this.$store.state.uMsg.scroll.maxScrollY;
                if(y!=0) this.$store.state.uMsg.scroll.scrollTo(0,y);
                else this.$store.state.uMsg.scroll.scrollTo(0,-1);
              },300);
              // 标记已读
              this.$ajax.post(this.$config.apiUrl+'msg/state',
                'token='+this.$storage.getItem('token')+'&id='+msg.data.id+'&state=1'
              ).then((res)=>{
                const d = res.data;
              });
            }else{
              // 记录数量
              this.$store.state.uMsg.group[''+fid].num++;
              this.$store.state.uMsg.num++;
            }
          }else{
            this.$store.state.socket.send(JSON.stringify({type:'group',uid:this.$store.state.uInfo.uid}));
          }
        }else if(msg.code==0 && msg.type=='notify'){
          // 幸运码
          if(msg.data.type=='activity'){
            this.$store.state.notify.activity = msg.data;
          }else if(msg.data.type=='disk'){
            // 大转盘
            this.$store.state.notify.disk = msg.data;
          }
        }
      }
    },
    /* 消息数 */
    getMsgNum(){
      const data = this.$store.state.uMsg.group;
      let num = 0;
      for(let i in data) num += data[i].num;
      this.$store.state.uMsg.num = num;
    },
    /* 关闭 */
    closeMsg(){
      if(this.$store.state.socket){
        this.$store.state.socket.close();
        this.$store.state.socket = null;
        this.$store.state.uMsg.group = [];
        this.$store.state.uMsg.num = '';
      }
    },

  }
}