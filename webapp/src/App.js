import Env from '@/env'
import Socket from '@/library/Socket'

import Vue from 'vue';
import { Button } from 'vant';
Vue.use(Button);

export default {
  watch:{
    $route(to,from){
      // 页面切换
      const isBack = this.$router.isBack;
      this.$router.isBack = false;
      this.transitionName = isBack?'slide-right':'slide-left';
    }
  },
  data(){
    return {
      keepAlive: 10,
      // 切换动画
      transitionName: 'slide-left',
      // 更新APP
      update: {show:false, os:'', down:false, loading:'0%', msg:'检测更新', file:'', total:0},
      upDateColor: Env.upDateColor,
      // 新消息
      msgNew: 0,
      msgInterval: null,
    }
  },
  mounted(){
    // 初始化
    setTimeout(()=>{this.init()},1000);
    // 播放声音
    document.body.ontouchstart = ()=>{document.createElement('audio');}
    /* 消息推送 */
    const token = this.$storage.getItem('token');
    if(token){
      Socket.event();
      Socket.start();
      clearInterval(this.msgInterval);
      this.msgInterval = setInterval(()=>{
        this.msgNew = this.$storage.getItem('msgNew');
      },1000);
    }
  },
  methods:{

    /* 初始化 */
    init(){
      try{
        plus
        // 状态栏高度
        Env.statusBar.height = plus.os.name=='Android'?'20px':'env(safe-area-inset-top)';
        // 竖屏
        plus.screen.lockOrientation("portrait-primary");
        // 状态栏
        plus.navigator.setStatusBarStyle('dark');
        plus.navigator.setStatusBarBackground(Env.themeColor);
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
              this.$createToast({txt:'再按一次退出应用!'}).show();
              backcount++;
              setTimeout(()=>{backcount=0;},2000);
            }
          });
          // 更新
          if(Env.update) this.isUpdate();
        });
      }catch(e){
        // 浏览器后退
        // window.history.pushState('forward', null, '#');
        // window.history.forward(1);
        // window.addEventListener("popstate", (e)=>{
        //   this.$router.goBack(-1);
        // });
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
              this.$createToast({txt:'安装失败'}).show();
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

  }
}