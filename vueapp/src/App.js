import Env from '@/env'
import Start from '@/library/Start'

import Toast from './library/ui/ui-toast'
import Post from './library/ui/request-post'
import VersionDiff from './library/inc/version-diff'
import PlusReady from './library/plus/plus-ready'

export default {
  data(){
    return {
      store: this.$store.state,
      // 切换动画
      transitionName: '',
      // 更新APP
      update: {show:false, os:'', down:false, loading:'0%', msg:'检测更新', file:'', total:0},
      updateCfg: Env.update,
      updateTitle: Env.title,
      updateCopy: Env.copy,
      // 新消息
      msgInterval: null,
    }
  },
  watch:{
    $route(to,from){
      // 页面切换动画
      if(to.path=='/' && from.path=='/') return ;
      this.transitionName = this.$router.isBack?'slide-right':'slide-left';
      this.$router.isBack = false;
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
    /* 启动服务 */
    Start.init(this);
    /* 检测更新 */
    if(Env.update.start) this.isUpdate();
  },
  methods:{

    /* 检测更新 */
    isUpdate(){
      PlusReady(()=>{
        this.update.os = plus.os.name;
        Post('index/appUpdate',{os:this.update.os},(res)=>{
          let d = res.data;
          if(d.code!=0) return false;
          // 是否更新
          plus.runtime.getProperty(plus.runtime.appid,(app)=>{
            // 比较
            if(VersionDiff(app.version,d.version)) return false;
            // 更新
            this.update.show = true;
            this.update.down = true;
            this.update.msg = '新版本: '+d.version+'&nbsp;&nbsp;大小: '+(d.size/1024/1024).toFixed(2)+'MB';
            this.update.file = this.$config.baseUrl+d.file;
            this.update.total = d.size;
          });
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

  }
}