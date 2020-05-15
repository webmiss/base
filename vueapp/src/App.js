import Start from '@/library/Start'
import Inc from '@/library/Inc'
import Plus from '@/library/Plus'

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
      upDateColor: Inc.config.upDateColor,
      // 新消息
      msgInterval: null,
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
    /* 项目 */
    Inc.self = this;
    /* 初始化 */
    setTimeout(()=>{
      Start.init(); // 启动
      if(Inc.config.update) this.isUpdate();  // 是否检测更新
    },1000);
  },
  methods:{

    /* 检测更新 */
    isUpdate(){
      if(!Plus.isPlus()) return false;
      this.update.os = plus.os.name;
      Inc.post('index/appUpdate',{os:this.update.os},(res)=>{
        let d = res.data;
        if(d.code!=0) return false;
        // 是否更新
        plus.runtime.getProperty(plus.runtime.appid,(app)=>{
          // 比较
          if(!Plus.versionDiff(app.version,d.version)) return false;
          // 更新
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
        window.open(Inc.config.upIosUrl);
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
              Inc.toast('安装失败!');
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