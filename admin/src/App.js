import Env from '@/env'
import Plus from '@/library/Plus'

export default {
  name: 'APP',
  data(){
    return {
      isLogin: false, // 是否登录
      isCollapse: false,  // 收缩菜单
      defaultMenu: '',  // 默认菜单
      // 更新APP
      update: {show:false,os:'',down:false,loading:'0%',msg:'检测更新',file:'',total:0},
      upDateColor: Env.upDateColor,
      // 登录数据
      login: {uname:'',passwd:'',subText:'登录',dis:false},
      // 系统信息
      system: {},
      uinfo: {},
      // 左侧菜单
      menus: [],
      // 新消息
      msgNew: 0,
      msgInterval: null,
    }
  },
  mounted(){
    try{
      plus
      // Plus组件
      Plus.isPlus(()=>{
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
              this.$router.go(-1);
              // 关闭项目
              if(this.$obj.scan) this.$obj.scan.close();
            }else{
              if(backcount>0) plus.runtime.quit();
              this.$createToast({txt:'再按一次退出应用!'}).show();
              backcount++;
              setTimeout(()=>{backcount=0;},2000);
            }
          });
        }, false);
        // 更新
        if(Env.update) this.isUpdate();
      });
    }catch(e){
      // 浏览器后退
      window.history.pushState('forward', null, '#');
      window.history.forward(1);
      window.addEventListener("popstate", (e)=>{
        this.$router.go(-1);
      });
      // 播放声音
      document.body.ontouchstart = ()=>{document.createElement('audio');}
    }
    // 默认菜单
    this.isCollapse = this.$storage.getItem('isCollapse')=='true'?true:false;
    this.defaultMenu = this.$storage.getItem('defaultMenu')?this.$storage.getItem('defaultMenu'):'3';
    // 系统信息
    this.getConfig();
    // 登录验证
    const token = this.$storage.getItem('token');
    if(token){
      this.isLogin = true;
      this.token((res)=>{
        if(res.data.code!=0){
          return this.logout();
        }else{
          // 获取菜单
          this.getMenus();
          this.uinfo = res.data.uinfo;
          /* 消息推送 */
          Socket.event();
          Socket.start();
          clearInterval(this.msgInterval);
          this.msgInterval = setInterval(()=>{
            this.msgNew = this.$storage.getItem('msgNew');
          },1000);
        }
      });
    }
  },
  methods:{

    /* 系统信息 */
    getConfig(){
      this.$ajax.post(
        this.$config.apiUrl+'index/getConfig'
      ).then((res)=>{
        const d = res.data;
        if(d.code==0) this.system = d.list;
      });
    },

    /* 获取菜单 */
    getMenus(){
      this.$ajax.post(
        this.$config.apiUrl+'UserMain/getMenus','token='+this.$storage.getItem('token')
      ).then((res)=>{
        let d = res.data;
        if(d.code==0) this.menus = d.menus;
      });
    },

    /* 跳转地址 */
    openUrl(ico,url,index,name,reload){
      // 保存-当前位置
      this.$storage.setItem('MenuName',name);
      this.$storage.setItem('defaultMenu',index);
      // 保存-快捷方式
      if(index!='3'){
        let menus = JSON.parse(this.$storage.getItem('Menus') || '[]');
        let data = {ico:ico,url:url,index:index,name:name};
        const n = menus.findIndex((item)=>JSON.stringify(item)==JSON.stringify(data));
        if(n>=0) menus.splice(n,1);
        menus.push({ico:ico,url:url,index:index,name:name});
        // 保存
        this.$storage.setItem('Menus',JSON.stringify(menus));
      }
      // 跳转
      this.$router.push(url);
      // 刷新
      if(reload) setTimeout(()=>{window.location.reload();},300);
    },

    /* 登录 */
    loginSub(){
      let uname = this.login.uname;
      let passwd = this.login.passwd;
      // 是否合法
      if(!uname || !passwd){
        return false;
      }else if(this.$reg('uname',uname)!=true && this.$reg('tel',uname)!=true && this.$reg('email',uname)!=true){
        return this.$message.error('请输入帐号/手机/邮箱！');
      }else if(this.$reg('passwd',passwd)!=true){
        return this.$message.error(this.$reg('passwd',passwd));
      }
      // 提交
      this.login.subText = '正在登录';
      this.login.dis = true;
      this.$ajax.post(
        this.$config.apiUrl+'user/login',
        'uname='+uname+'&passwd='+passwd
      ).then((res)=>{
        this.login.subText = '登录';
        this.login.dis = false;
        const d = res.data;
        if(d.code!=0){
          this.$message.error(d.msg);
        }else{
          this.isLogin = true;
          this.$storage.setItem('token',d.token);
          this.$storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 刷新
          window.location.reload();
        }
      });
    },

    /* 退出 */
    logout(){
      this.isLogin = false;
      this.$storage.setItem('token','');
      this.$storage.setItem('uinfo','');
    },

    /* Token验证 */
    token(callback){
      this.$ajax.post(
        this.$config.apiUrl+'user/token','token='+this.$storage.getItem('token')
      ).then(callback);
    },

    /* 收缩菜单 */
    hideMenus(){
      this.isCollapse = !this.isCollapse;
      this.$storage.setItem('isCollapse',this.isCollapse);
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
        window.open(this.update.file);
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