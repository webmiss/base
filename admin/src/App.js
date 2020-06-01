import Start from '@/library/Start'
import Inc from '@/library/Inc'
import Plus from '@/library/Plus'
import Socket from '@/library/Socket'
// Scroll
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup);

import Popup from '@/components/popup'

export default {
  name: 'APP',
  components: {Popup},
  data(){
    return {
      storage: Inc.storage,
      // 更新APP
      update: {show:false,os:'',down:false,loading:'0%',msg:'检测更新',file:'',total:0},
      upDateColor: Inc.config.update,
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
    /* 项目 */
    Inc.self = this;
    /* 初始化 */
    setTimeout(()=>{
      Start.init(); // 启动
      if(Inc.config.update.start) this.isUpdate();  // 是否检测更新
    },1000);
    /* 获取菜单 */
    if(Inc.storage.getItem('token')) this.getMenus();
    // 默认菜单
    this.$store.state.collapseMenu = Inc.storage.getItem('isCollapse')=='true'?true:false;
    this.$store.state.defaultMenu = Inc.storage.getItem('defaultMenu')?Inc.storage.getItem('defaultMenu'):'3';
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

    /* 登录 */
    loginSub(){
      // 验证
      let uname = this.login.uname;
      let passwd = this.login.passwd;
      let reg_passwd = Inc.reg('passwd',passwd);
      if(Inc.reg('uname',uname)!==true && Inc.reg('email',uname)!==true && Inc.reg('tel',uname)!==true) return Inc.toast('请输入帐号/手机/邮箱');
      else if(reg_passwd!==true) return Inc.toast(reg_passwd);
      // 提交
      this.login.subText = '正在登录';
      this.login.dis = true;
      const load = Inc.loading();
      Inc.post('user/login',{uname:uname,passwd:passwd},(res)=>{
        load.clear();
        this.login.subText = '登 录';
        this.login.dis = false;
        const d = res.data;
        if(d.code==0){
          this.$store.state.isLogin = true;
          Inc.self.$store.state.uInfo = d.uinfo;
          Inc.storage.setItem('token',d.token);
          // 用户菜单
          this.getMenus();
        }else{
          Inc.self.$store.state.isLogin = false;
          Inc.self.$store.state.uInfo = {};
          Inc.storage.setItem('token','');
          Inc.toast(d.msg,'error');
        }
      },(e)=>{
        load.clear();
        Inc.toast('网络加载失败!');
      });
    },
    /* 退出 */
    logout(){
      this.$store.state.isLogin = false;
      this.$store.state.uInfo = {};
      Inc.storage.setItem('token','');
      // 关闭Socket
      Socket._closeMsg();
    },

    /* 用户菜单 */
    getMenus(){
      Inc.post('Usermain/getMenus',{token:Inc.storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code==0) Inc.self.$store.state.menus = d.menus;
      });
    },
    /* 收缩菜单 */
    hideMenus(){
      this.isCollapse = !this.isCollapse;
      Inc.storage.setItem('isCollapse',this.isCollapse);
      this.$store.state.collapseMenu = this.isCollapse;
    },
    /* 跳转地址 */
    openUrl(ico,url,index,name){
      // 保存-当前位置
      Inc.storage.setItem('MenuName',name);
      Inc.storage.setItem('defaultMenu',index);
      this.$store.state.defaultMenu = index;
      // 保存-快捷方式
      if(index!='3'){
        let menus = JSON.parse(Inc.storage.getItem('Menus') || '[]');
        let data = {ico:ico,url:url,index:index,name:name};
        const n = menus.findIndex((item)=>JSON.stringify(item)==JSON.stringify(data));
        if(n>=0) menus.splice(n,1);
        menus.push({ico:ico,url:url,index:index,name:name});
        // 保存
        Inc.storage.setItem('Menus',JSON.stringify(menus));
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
      const load = Inc.loading();
      Inc.post('Userinfo/edit',
        {token:Inc.storage.getItem('token'),data:JSON.stringify(data)},
      (res)=>{
        load.clear();
        const d = res.data;
        this.$store.state.uinfo[key] = this.config[key];
        return d.code==0?Inc.toast(d.msg,'success'):Inc.toast(d.msg,'error');
      });
    },

    /* 消息-显示 */
    openMsg(){
      this.msg.show = true;
    },

  }
}