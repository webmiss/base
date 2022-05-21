import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from './env'
import Start from '@/library/Start'
/* JS组件 */
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Loading from '@/library/ui/loading'
import Storage from '@/library/Storage'
import RegRight from '@/library/reg/right'
import NavigateTo from '@/library/ui/navigate-to'
/* UI组件 */
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmSearch from '@/components/search/index.vue'

export default defineComponent({
  name: 'APP',
  components: {wmInput,wmButton,wmPopover,wmSearch},
  data(){
    const store: any = useStore();
    const state: any = store.state;
    const router: any = this.$router;
    // 切换动画
    const transitionName: string = '';
    // 信息
    const info: any = {title: Env.title, version: Env.version, copy: Env.copy};
    // 登录数据
    const login: any = {uname:'',passwd:'',subText:'登 录',dis:false};
    // 左侧菜单
    const menusPos: any = [0,0,0];
    const menusChildren: any = [];
    const menusSeaList: any = [];
    // 语言
    const language: any = {
      num: 0,
      list: [
        {name:'php',val:'PHP7( Phalcon4 )'},
        {name:'python',val:'Python3( Flask )'},
        {name:'java',val:'Java( SpringBoot )'},
        {name:'go',val:'GoLang( Gin )'},
      ]
    };
    return {state,router,transitionName,info,login,menusChildren,menusPos,menusSeaList,language}
  },
  watch:{
    $route(to,from){
      // 页面切换动画
      if(to.path=='/' && from.path=='/') return ;
      this.transitionName = this.router.isBack?'slide-right':'slide-left';
      this.router.isBack = false;
    },
    // 清空密码
    isLogin(val){
      if(!val) this.login.passwd = '';
    },
  },
  computed:{
    // @ts-ignore
    mode(){ return this.state.mode; },
    // @ts-ignore
    isLogin(){ return this.state.isLogin; },
  },
  mounted(){
    // 启动服务
    setTimeout(()=>{ Start.init(); },400);
    // 用户名
    this.login.uname = Storage.getItem('uname');
    // Enter事件
    this._enter();
    // 获取菜单
    if(Storage.getItem('token')) this.getMenus();
    // 默认语言
    this.setLanguage();
  },
  methods:{

    /* 切换语言 */
    Language(index: number){
      let data = this.language.list[index];
      data.index = index;
      Storage.setItem('language',JSON.stringify(data));
      window.location.href = '';
    },
    setLanguage(){
      const lag: any = Storage.getItem('language');
      const lagData: any = lag?JSON.parse(lag):this.language.list[0];
      this.language.num = lagData.index || 0;
    },

    /* 登录 */
    loginSub(){
      // 验证
      let uname = this.login.uname;
      let passwd = this.login.passwd;
      let reg_passwd = RegRight('passwd',passwd);
      if(RegRight('uname',uname)!==true && RegRight('email',uname)!==true && RegRight('tel',uname)!==true) return Toast('请输入手机号码');
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
          // 获取菜单
          this.getMenus();
          // 刷新路由
          if(this.$route.path!='/'){
            this.$router.replace({path:'/refresh'});
          }
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
      if(Env.socket.start && this.state.socket) this.state.socket.close();
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
      Post('sys_menus/getMenus',{token:Storage.getItem('token')},(res: any)=>{
        let d = res.data;
        if(d.code==0){
          // 全部
          this.state.menus = d.menus;
          // 跳转位置
          let active: number[] = [];
          let pos = Storage.getItem('menusPos');
          active = pos?JSON.parse(pos):this.menusPos;
          this.menusClick(active);
          // 搜索内容
          let data = [];
          for(let x in this.state.menus){
            if(!this.state.menus[x].children) continue;
            for(let y in this.state.menus[x].children){
              if(!this.state.menus[x].children[y].children) continue;
              for(let z in this.state.menus[x].children[y].children){
                let arr: any = this.state.menus[x].children[y].children[z];
                data.push({label:arr.label, value:JSON.stringify([x,y,z])});
              }
            }
          }
          this.menusSeaList = data;
        }
      },()=>{
        this.logout();
      });
    },
    /* 点击菜单 */
    menusClick(pos: number[], url: string='/'){
      // 位置
      this.menusPos = pos
      Storage.setItem('menusPos',JSON.stringify(pos));
      // 子菜单
      this.menusChildren = this.state.menus[pos[0]].children || [];
      if(pos[0]==0){
        this.state.menuTitle = Env.title;
        return NavigateTo(url);
      }
      if(!this.menusChildren[pos[1]] || !this.menusChildren[pos[1]].children) return;
      let menu = this.menusChildren[pos[1]].children[pos[2]];
      this.state.menuAction = menu.value.action;
      this.state.menuTitle = menu.label;
      // 跳转
      NavigateTo(menu.value.url);
    },
    /* 菜单动画 */
    menusStyle(v: any){
      v.checked = v.checked?false:true;
    },

  }
});