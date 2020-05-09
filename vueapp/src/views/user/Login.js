import Vue from 'vue'
import Inc from '@/library/Inc'
/* 组件 */
import PageView from '@/components/page-view'

/* 监听左滑 */
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});

export default {
  components: {PageView},
  data(){
    return {
      // 表单
      fromData:{tel:'',passwd:''},
      subInfo:{state:true,text:'登 录'},
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
  },
  activated(){
  },
  methods:{

    /* 返回 */
    back(){
      Inc.back(1);
    },

    /* 登录 */
    login(){
      // 验证
      const tel = this.fromData.tel;
      const passwd = this.fromData.passwd;
      let reg_tel = Inc.reg('tel',tel);
      let reg_passwd = Inc.reg('passwd',passwd);
      if(reg_tel!==true) return Inc.toast(reg_tel);
      else if(reg_passwd!==true) return Inc.toast(reg_passwd);
      // 请求
      if(!this.subInfo.state) return false;
      this.subInfo.state = false;
      this.subInfo.text = '正在登录';
      const load = Inc.loading();
      Inc.post('user/login',{tel:tel,passwd:passwd},(res)=>{
        load.clear();
        this.subInfo.state = true;
        this.subInfo.text = '登 录';
        const d = res.data;
        if(d.code==0){
          // 状态
          this.$store.state.isLogin = true;
          this.$store.state.uInfo = d.uinfo;
          Inc.storage.setItem('token',d.token);
          // 返回
          Inc.toast('登录成功');
          Inc.back(1);
        }else Inc.toast(d.msg);
      },(e)=>{
        load.clear();
        Inc.toast('网络加载失败!');
      });
    }

  }
}