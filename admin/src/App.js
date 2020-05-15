import Env from '@/env'
import Inc from '@/library/Inc'
import Plus from '@/library/Plus'
// Scroll
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup);

export default {
  name: 'APP',
  data(){
    return {
      isLogin: false, // 是否登录
      isCollapse: false,  // 收缩菜单
      defaultMenu: '',  // 默认菜单
      storage: Inc.storage,
      // 更新APP
      update: {show:false,os:'',down:false,loading:'0%',msg:'检测更新',file:'',total:0},
      upDateColor: Env.upDateColor,
      // 登录数据
      login: {uname:'',passwd:'',subText:'登 录',dis:false},
      // 左侧菜单
      menus: [],
      // 配置
      config:{show:false, title:'系统配置', is_msg_audio:true,},
      // 扫码
      scan:{show:false},
      scanData:{show:false,active:'one',title:'今日患者医嘱( '+Inc.getDay(0)+' )',uid:'',pid:'',info:'',data:{}},
      scanTimeout:null,
      // 消息系统
      msgData:{show:false,scroll:null,y:0,title:'消息系统',content:'',gid:'',data:[],group:[]},
      msgGroup:{show:false,class:[],add:{uid:'',title:''}},
    }
  },
  mounted(){
    // Vue对象
    Inc.self = this;
    // 初始化
    setTimeout(()=>{this.init();},3000);
    // 默认菜单
    this.isCollapse = Inc.storage.getItem('isCollapse')=='true'?true:false;
    this.defaultMenu = Inc.storage.getItem('defaultMenu')?Inc.storage.getItem('defaultMenu'):'3';
    // 系统信息
    this.getConfig();
    // 登录验证
    this.loginVerify();
  },
  methods:{

    /* 初始化 */
    init(){
      try{
        plus;
        // 竖屏
        // plus.screen.lockOrientation("portrait-primary");
        // 状态栏
        plus.navigator.setStatusBarStyle('dark');
        plus.navigator.setStatusBarBackground(Env.themeColor);
        this.$store.state.statusBar.height = Plus.getStatusBarHeight()+'px';
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
              this.$message.error('再按一次退出应用!');
              backcount++;
              setTimeout(()=>{backcount=0;},2000);
            }
          });
        }, false);
        // 更新
        if(Env.update) this.isUpdate();
      }catch(e){
        console.log('plus: 不兼容');
      }
    },

    /* 系统信息 */
    getConfig(){
      Inc.post('index/getConfig',{},(res)=>{
        const d = res.data;
        if(d.code==0) this.$store.state.system = d.list;
      });
    },

    /* 登录检测 */
    loginVerify(){
      const token = Inc.storage.getItem('token');
      if(!token) return false;
      this.isLogin = true;
      this.token((res)=>{
        let d = res.data;
        if(d.code!=0){
          return this.logout();
        }else{
          // 用户信息
          this.$store.state.uinfo = d.uinfo;
          Inc.storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 系统配置
          this.config.is_msg_audio = d.uinfo.is_msg_audio=='1'?true:false;
          this.config.is_group = d.uinfo.is_group=='1'?true:false;
          // 获取菜单
          this.getMenus();
          /* 消息推送 */
          this.socketStart();
        }
      });
    },

    /* Socket */
    socketStart(){
      Inc.post('Usermain/centreToken',{token:Inc.storage.getItem('token')},(res)=>{
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
          try{ this.$store.state.socket.send(JSON.stringify({type:''})); }catch(e){ this.socketStart(); }
        },10000);
        // 消息组(发送)
        this.$store.state.socket.send(JSON.stringify({type:'group'}));
      }
      /* 关闭 */
      this.$store.state.socket.onclose = ()=>{
        console.log('消息关闭');
        setTimeout(()=>{ this.socketStart(); },10000);
      }
      /* 接收 */
      this.$store.state.socket.onmessage = (e)=>{
        const msg = JSON.parse(e.data);
        // 消息组
        if(msg.code==0 && msg.type=='group'){
          this.msgData.group = msg.data;
          // 消息数
          this.getMsgNum();
        }else if(msg.code==0 && msg.type=='msg'){
          // 系统消息
          if(msg.gid==1){
            msg.data.img = this.$config.baseUrl+this.$store.state.system.logo;
            if(msg.data.title){
              // 提示
              Plus.notify(msg.data.title,msg.data.content,(obj)=>{
                obj.close();
              },this.config.is_msg_audio);
            }
          }
          // 追加消息
          this.msgData.group[''+msg.gid].data.push(msg.data);
          if(!this.msgData.show || msg.gid!=this.msgData.gid) this.msgData.group[''+msg.gid].num += 1;
          // 消息数
          this.getMsgNum();
          // 刷新信息
          this.reMsgScroll();
        }
      }
    },
    /* 消息数 */
    getMsgNum(){
      const data = this.msgData.group;
      let num = 0;
      for(let i in data) num += data[i].num;
      this.$store.state.msgNum = num;
    },

    /* 获取菜单 */
    getMenus(){
      Inc.post('Usermain/getMenus',{token:Inc.storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code==0) this.menus = d.menus;
      });
    },

    /* 跳转地址 */
    openUrl(ico,url,index,name,reload){
      // 保存-当前位置
      Inc.storage.setItem('MenuName',name);
      Inc.storage.setItem('defaultMenu',index);
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
      // 刷新
      if(reload) setTimeout(()=>{window.location.reload();},300);
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
        if(d.code!=0){
          Inc.toast(d.msg,'error');
        }else{
          this.isLogin = true;
          Inc.storage.setItem('token',d.token);
          // 刷新
          this.loginVerify();
        }
      },(e)=>{
        load.clear();
        Inc.toast('网络加载失败!');
      });
    },

    /* 退出 */
    logout(){
      this.isLogin = false;
      Inc.storage.setItem('token','');
      Inc.storage.setItem('uinfo','');
    },

    /* Token验证 */
    token(callback){
      Inc.post('user/token',{token:Inc.storage.getItem('token')},callback);
    },

    /* 收缩菜单 */
    hideMenus(){
      this.isCollapse = !this.isCollapse;
      Inc.storage.setItem('isCollapse',this.isCollapse);
    },

    /* 检测更新 */
    isUpdate(){
      this.update.os = plus.os.name;
      Inc.post('index/appUpdate',{os:this.update.os},(res)=>{
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
              this.$message.error('安装失败!');
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
        return d.code==0?this.$message.success(d.msg):Inc.toast(d.msg,'error');
      });
    },

    /* 消息 */
    openMsg(){
      this.msgData.show = true;
      // 刷新频道
      if(this.msgData.gid) this.getChannel();
      // 事件
      setTimeout(()=>{
        let el = this.$refs.msgSend;
        document.onkeydown = (e)=>{
          if(e.ctrlKey && e.keyCode==13){ this.msgData.content+='\n'; return false; }
          else if(e.keyCode==13){ this.sendMsg(); return false; }
        };
      },300);
    },
    /* 打开信息 */
    getMsg(gid,row){
      this.msgData.gid = gid;
      this.msgData.title = row.name;
      this.msgData.data = row.data;
      // 消息数
      this.msgData.group[gid].num = 0;
      this.getMsgNum();
      // 切换频道
      this.getChannel();
    },
    /* 发送消息 */
    sendMsg(){
      if(!this.msgData.gid) return this.$message.error('请选择组');
      if(!this.msgData.content) return this.$message.error('请输入消息');
      // 数据
      const data = {
        gid:this.msgData.gid, fid:this.$store.state.uinfo.uid, content:this.msgData.content, img:this.$store.state.uinfo.img, ctime:Inc.getDate()
      };
      // 发送
      this.$store.state.socket.send(JSON.stringify({
        type:'msg', gid:this.msgData.gid, data:data
      }));
      // 系统消息
      if(this.msgData.gid==1){
        this.msgData.group['1'].data.push(data);
      }
      // 重置内容
      this.msgData.content = '';
    },

    /* 创建组 */
    addGroup(){
      console.log(123);
      this.msgGroup.show = true;
    },
    subGroup(){
      console.log('提交组');
    },

    /* 刷新消息 */
    reMsgScroll(){
      setTimeout(()=>{
        this.msgData.scroll.refresh();
        let y = this.$refs.msgContent.scrollHeight;
        let to = y-this.msgData.y;
        this.msgData.y = y;
        if(this.msgData.scroll.maxScrollY<0) this.msgData.scroll.scrollBy(0,-to,0);
      },300);
    },
    /* 切换频道 */
    getChannel(){
      setTimeout(()=>{
        if(!this.msgData.scroll){
          this.msgData.scroll = new BScroll(this.$refs.msgMain,{click:true,pullUpLoad:true});
          /* 下拉刷新 */
          this.msgData.scroll.on('touchEnd',(res) =>{
            if(res.y>30){console.log('下拉');}
          });
        }
        // 重置高度
        this.msgData.scroll.refresh();
        // 滚动底部
        let y = this.$refs.msgContent.scrollHeight;
        this.msgData.scroll.scrollBy(0,-y,0);
        // 保存位置
        this.msgData.y = y;
      },300);
    },
    /* 消息类型 */
    getMsgType(num){
      const type = ['消息','转诊'];
      return type[num];
    }

  }
}