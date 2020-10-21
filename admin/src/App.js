import Env from '@/env'
import Start from '@/library/Start'
/* JS组件 */
import Loading from './library/ui/ui-loading'
import Post from './library/ui/request-post'
import Toast from './library/ui/ui-toast'
import Storage from './library/ui/storage'
import VersionDiff from './library/inc/version-diff'
import Reg from './library/inc/reg'
import PlusReady from './library/plus/plus-ready'
/* UI组件 */
import ScrollView from './components/scroll-view'
import wmMenu from './components/menu'
import wmInput from './components/form/input'
import wmButton from './components/form/button'
import wmAction from './components/action'

export default {
  name: 'APP',
  components: {ScrollView,wmMenu,wmInput,wmButton,wmAction},
  data(){
    return {
      env: Env,
      storage: Storage,
      store: this.$store.state,
      // 更新APP
      update: {show:false,os:'',down:false,loading:'1%',msg:'检测更新',file:'',total:0},
      upDateColor: Env.update,
      // 登录数据
      login: {uname:'',passwd:'',subText:'登 录',dis:false},
      // 左侧菜单
      menus: [],
      menusActive: [0,0], 
      // 配置
      config:{show:false, title:'系统配置', is_msg_audio:true,},
      // 语言
      languageNum: 0,
      language:[
        {name:'php',val:'PHP7( Phalcon4 )'},
        {name:'python',val:'Python3( Flask )'},
        {name:'java',val:'Java( SpringBoot )'},
      ],
    }
  },
  mounted(){
    // 启动服务
    Start.init(this);
    // 检测更新
    if(Env.update.start) this.isUpdate();
    // 用户名
    this.login.uname = Storage.getItem('uname'); 
    // 默认语言
    this.reLanguage();
    // Enter事件
    this._enter();
    // 是否登录
    if(Storage.getItem('token')) this.getMenus();
  },
  methods:{

    /* 切换语言 */
    platform(index){
      let data = this.language[index];
      data.index = index;
      Storage.setItem('platform',JSON.stringify(data));
      window.location.href = '';
    },
    reLanguage(){
      const lag = Storage.getItem('platform');
      const lagData = lag?JSON.parse(lag):this.language[0];
      this.languageNum = lagData.index || 0;
    },

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
            if(!VersionDiff(app.version,d.version)) return false;
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
      Post('user/login',{uname:uname,passwd:passwd},(res)=>{
        load.clear();
        this.login.subText = '登 录';
        this.login.dis = false;
        const d = res.data;
        if(d.code==0){
          this.store.isLogin = true;
          this.store.uInfo = d.uinfo;
          Storage.setItem('token',d.token);
          Storage.setItem('uname',d.uinfo.uname);
          Storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 用户菜单
          this.getMenus();
          // 刷新路由
          this.$router.replace({path:'/refresh'});
        }else{
          this.store.isLogin = false;
          this.store.uInfo = {};
          Storage.setItem('token','');
          Toast(d.msg);
        }
      },(e)=>{
        load.clear();
        Toast('网络加载失败!');
        this.login.subText = '登 录';
        this.login.dis = false;
      });
    },
    /* 退出 */
    logout(){
      this.store.isLogin = false;
      this.store.uInfo = {};
      Storage.setItem('token','');
      this.login.passwd = '';
    },
    /* Enter登录 */
    _enter(){
      document.onkeydown = (event)=>{
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13 && !this.store.isLogin) this.loginSub();
      }
    },

    /* 用户菜单 */
    getMenus(){
      Post('Sysmenus/getMenus',{token:Storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code==0){
          this.menus = d.menus;
          // 默认菜单
          this.menusActive = Storage.getItem('menusActive')?JSON.parse(Storage.getItem('menusActive')):[0,1];
          const obj = this.$refs.Menus;
          setTimeout(()=>{
            obj.titleClick(this.menusActive[0]);
            obj.menuClick(this.menusActive);
          },300);
        }
      });
    },
    /* 点击菜单 */
    menuClick(pos){
      Storage.setItem('menusActive',JSON.stringify(pos));
      const obj = this.menus[pos[0]].children[pos[1]];
      this.store.menuName = obj.title=='控制台'?'':obj.title;
      this.$router.push(obj.url);
    },

  }
}