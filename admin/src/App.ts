import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from './env'
import Start from '@/library/Start'
/* JS组件 */
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import VersionDiff from '@/library/inc/version-diff'
import PlusReady from '@/library/plus/plus-ready'
import Loading from '@/library/ui/ui-loading'
import Storage from '@/library/ui/storage'
import Reg from '@/library/inc/reg'
import NavigateTo from '@/library/ui/ui-navigate-to'
/* UI组件 */
import wmScrollView from '@/components/scroll-view/index.vue'
import wmMenu from '@/components/menu/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmAction from '@/components/action/index.vue'

export default defineComponent({
  name: 'APP',
  components: {wmScrollView,wmMenu,wmInput,wmButton,wmPopover,wmAction},
  data(){
    const store: any = useStore();
    const state: any = store.state;
    const router: any = this.$router;
    // 切换动画
    const transitionName: string = '';
    // 更新APP
    const update: any = {show:false, os:'', down:false, loading:'0%', msg:'检测更新', file:'', total:0};
    const updateCfg: any = Env.update;
    const updateText: object = {title: Env.title, copy: Env.copy};
    // 信息
    const info: any = {title: Env.title, version: Env.version, copy: Env.copy};
    // 登录数据
    const login: any = {uname:'',passwd:'',subText:'登 录',dis:false};
    // 语言
    const languageNum: number = 0;
    const language: any = [
      {name:'php',val:'PHP7( Phalcon4 )'},
      {name:'python',val:'Python3( Flask )'},
      {name:'java',val:'Java( SpringBoot )'},
    ];
    // 左侧菜单
    const menus: any = [];
    const menusActive: any = [0,0];
    return {state,router,transitionName,update,updateCfg,info,login,languageNum,language,menus,menusActive}
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
    // 用户名
    this.login.uname = Storage.getItem('uname');
    // 系统信息
    this.getConfig();
    // 默认语言
    this.setLanguage(); 
    // Enter事件
    this._enter();
    // 获取菜单
    if(Storage.getItem('token')) this.getMenus();
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

    /* 切换语言 */
    platform(index: number){
      let data = this.language[index];
      data.index = index;
      Storage.setItem('platform',JSON.stringify(data));
      window.location.href = '';
    },
    setLanguage(){
      const lag: any = Storage.getItem('platform');
      const lagData: any = lag?JSON.parse(lag):this.language[0];
      this.languageNum = lagData.index || 0;
    },

    /* 系统信息 */
    getConfig(){
      Post('index/getConfig',{},(res: any)=>{
        const d = res.data;
        if(d.code==0) this.state.system = d.list;
      },()=>{
        Toast('网络加载失败!');
      });
    },

    /* 登录 */
    loginSub(){
      // 验证
      let uname = this.login.uname;
      let passwd = this.login.passwd;
      let reg_passwd = Reg('passwd',passwd);
      if(Reg('uname',uname)!==true && Reg('email',uname)!==true && Reg('tel',uname)!==true) return Toast('请输入帐号/手机/邮箱');
      else if(reg_passwd!==true) return Toast(reg_passwd);
      // 提交
      this.login.subText = '正在登录';
      this.login.dis = true;
      const load = Loading();
      Post('user/login',{uname:uname,passwd:passwd},(res: any)=>{
        load.clear();
        this.login.subText = '登 录';
        this.login.dis = false;
        const d: any = res.data;
        if(d.code==0){
          this.state.isLogin = true;
          this.state.uInfo = d.uinfo;
          Storage.setItem('token',d.token);
          Storage.setItem('uname',d.uinfo.uname);
          Storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 用户菜单
          this.getMenus();
          // 刷新路由
          this.$router.replace({path:'/refresh'});
        }else{
          this.state.isLogin = false;
          this.state.uInfo = {};
          Storage.setItem('token','');
          Toast(d.msg);
        }
      },()=>{
        load.clear();
        Toast('网络加载失败!');
        this.login.subText = '登 录';
        this.login.dis = false;
      });
    },
    /* 退出 */
    logout(){
      this.state.isLogin = false;
      this.state.uInfo = {};
      Storage.setItem('token','');
      this.login.passwd = '';
    },
    /* Enter登录 */
    _enter(){
      document.onkeydown = (event)=>{
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13 && !this.state.isLogin) this.loginSub();
      }
    },

    /* 用户菜单 */
    getMenus(){
      Post('Sysmenus/getMenus',{token:Storage.getItem('token')},(res: any)=>{
        let d = res.data;
        if(d.code==0){
          this.menus = d.menus;
        }
      });
    },
    /* 点击菜单 */
    menuClick(pos: number[], value: string, label: string){
      NavigateTo(value);
      // 默认动作菜单
      this.state.menuName = label;
      this.state.action.url = '';
      this.state.action.menus = [];
    },

  }
});