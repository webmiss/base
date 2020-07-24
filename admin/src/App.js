import Env from '@/env'
import Start from '@/library/Start'
import {Loading,Post,Toast,VersionDiff,Storage,Reg} from '@/library/inc'
import PlusReady from '@/library/plus/plus-ready'
import Socket from '@/library/Socket'
import Action from '@/components/action'
/* Scroll */
import BScroll from 'better-scroll'
// 弹出层
import Popup from '@/components/popup'

export default {
  name: 'APP',
  components: {Action,Popup},
  data(){
    return {
      storage: Storage,
      // 滑动
      menusScroll: null,
      actionScroll: null,
      // 更新APP
      update: {show:false,os:'',down:false,loading:'0%',msg:'检测更新',file:'',total:0},
      upDateColor: Env.update,
      // 登录数据
      login: {uname:'',passwd:'',subText:'登 录',dis:false},
      // 左侧菜单
      menus: [],
      // 配置
      config:{show:false, title:'系统配置', is_msg_audio:true,},
      // 消息
      msg:{show:false},
    }
  },
  mounted(){
    // 启动服务
    Start.init(this);
    // 检测更新
    if(Env.update.start) this.isUpdate();
    // 获取菜单
    if(Storage.getItem('token')) this.getMenus();
    // Enter事件
    this._enter();
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
          this.$store.state.isLogin = true;
          this.$store.state.uInfo = d.uinfo;
          Storage.setItem('token',d.token);
          // 用户菜单
          this.getMenus();
          // 刷新路由
          this.$router.replace({path:'/refresh'});
        }else{
          this.$store.state.isLogin = false;
          this.$store.state.uInfo = {};
          Storage.setItem('token','');
          Toast(d.msg);
        }
      },(e)=>{
        load.clear();
        Toast('网络加载失败!');
      });
    },
    /* 退出 */
    logout(){
      this.$store.state.isLogin = false;
      this.$store.state.uInfo = {};
      Storage.setItem('token','');
      // 关闭Socket
      Socket._closeMsg();
      // Enter事件
      this._enter();
    },
    /* Enter登录 */
    _enter(){
      document.onkeydown = (event)=>{
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13 && !this.$store.state.isLogin) this.loginSub();
      }
    },

    /* 用户菜单 */
    getMenus(){
      // 默认菜单
      this.$store.state.collapseMenu = Storage.getItem('isCollapse')=='true'?true:false;
      this.$store.state.defaultMenu = Storage.getItem('defaultMenu')?Storage.getItem('defaultMenu'):'3';
      // 滑动-菜单
      let menu = this.$refs.LeftMenus;
      if(menu){
        this.menusScroll = new BScroll(menu,{
          scrollY:true,
          click:true,probeType:2,mouseWheel:true,
          scrollbar:{fade:true,interactive:false},
        });
      }
      // 滑动-动作
      let action = this.$refs.TopAction;
      if(action){
        this.actionScroll = new BScroll(action,{
          scrollX:true,
          click:true,probeType:2,mouseWheel:true,
          scrollbar:{fade:true,interactive:false},
        });
      }
      // 请求
      Post('Usermain/getMenus',{token:Storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code==0){
          this.$store.state.menus = d.menus;
        }
      });
    },
    /* 收缩菜单 */
    hideMenus(){
      this.isCollapse = !this.isCollapse;
      Storage.setItem('isCollapse',this.isCollapse);
      this.$store.state.collapseMenu = this.isCollapse;
    },
    /* 跳转地址 */
    openUrl(ico,url,index,name){
      // 保存-当前位置
      Storage.setItem('MenuName',name);
      Storage.setItem('defaultMenu',index);
      this.$store.state.defaultMenu = index;
      // 保存-快捷方式
      if(index!='3'){
        let menus = JSON.parse(Storage.getItem('Menus') || '[]');
        let data = {ico:ico,url:url,index:index,name:name};
        const n = menus.findIndex((item)=>JSON.stringify(item)==JSON.stringify(data));
        if(n>=0) menus.splice(n,1);
        menus.push({ico:ico,url:url,index:index,name:name});
        // 保存
        Storage.setItem('Menus',JSON.stringify(menus));
      }
      // 跳转
      this.$router.push(url);
    },

    /* 系统配置 */
    openConfig(){
      this.config.show = true;
    },
    subConfig(key){
      let data = {};
      data[key] = this.config[key]?'1':'0';
      // 提交
      const load = Loading();
      Post('Userinfo/edit',
        {token:Storage.getItem('token'),data:JSON.stringify(data)},
      (res)=>{
        load.clear();
        const d = res.data;
        this.$store.state.uinfo[key] = this.config[key];
        return d.code==0?Toast(d.msg):Toast(d.msg);
      });
    },

    /* 消息-显示 */
    openMsg(){
      this.msg.show = true;
    },

  }
}