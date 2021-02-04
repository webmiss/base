import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from './env'
import Start from '@/library/Start'

import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import VersionDiff from '@/library/inc/version-diff'
import PlusReady from '@/library/plus/plus-ready'

export default defineComponent({
  name: 'APP',
  components: {},
  data(){
    const store: any = useStore();
    const state: any = store.state;
    const router: any = this.$router;
    // 切换动画
    const transitionName: string = '';
    // 更新APP
    const update: any = {show:false, os:'', down:false, loading:'0%', msg:'检测更新', file:'', total:0};
    const updateCfg: any = Env.update;
    // 信息
    const info: any = {title: Env.title, version: Env.version, copy: Env.copy};
    return {state,router,transitionName,update,updateCfg,info}
  },
  watch:{
    $route(to,from){
      // 页面切换动画
      if(to.path=='/' && from.path=='/') return ;
      this.transitionName = this.router.isBack?'slide-right':'slide-left';
      this.router.isBack = false;
    }
  },
  computed:{
    // @ts-ignore
    mode(){ return this.state.mode; },
  },
  mounted(){
    /* 启动服务 */
    setTimeout(()=>{ Start.init(); },400);
    /* 检测更新 */
    if(Env.update.start) this.isUpdate();
  },
  methods:{

    /* 检测更新 */
    isUpdate(){
      PlusReady(()=>{
        // @ts-ignore
        this.update.os = plus.os.name;
        Post('index/appUpdate',{os:this.update.os},(res: any)=>{
          let d = res.data;
          if(d.code!=0) return false;
          // @ts-ignore 是否更新
          plus.runtime.getProperty(plus.runtime.appid,(app)=>{
            // 比较
            if(VersionDiff(app.version,d.version)) return false;
            // 更新
            this.update.show = true;
            this.update.down = true;
            this.update.msg = '新版本: '+d.version+'&nbsp;&nbsp;大小: '+(d.size/1024/1024).toFixed(2)+'MB';
            this.update.file = Env.baseUrl+d.file;
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
          // @ts-ignore
          plus.runtime.quit();
        },5000);
      }else{
        // @ts-ignore 安卓手机
        let down = plus.downloader.createDownload(this.update.file, {
          'filename':'_doc/download/',
          'timeout': 30,
        },(d: any, status: any)=>{
          if(status == 200){
            // @ts-ignore 安装并重启
            plus.runtime.install(d.filename, {force:true},()=>{
              // @ts-ignore
              plus.runtime.restart();
            },()=>{
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
        down.addEventListener('statechanged',(res: any, status: any)=>{
          // @ts-ignore
          let complete = parseInt(res.downloadedSize/this.update.total*100);
          this.update.loading = complete+'%';
          this.update.msg = '正在下载：'+this.update.loading;
          if (complete >= 100) this.update.msg = '下载完成，安装并重启';
        });
      }
    },

  }
});