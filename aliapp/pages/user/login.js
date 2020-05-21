import store from '../../store'
import create from '../../libray/create'
import Inc from '../../libray/Inc'

create(store,{
  data:{
    // 状态
    isLogin: null,
    uInfo: null,
    // 表单
    fromData:{tel:'',passwd:''},
    subInfo:{state:true,text:'登 录'},
  },
  /* 加载 */
  onLoad(e){
  },

  /* 返回 */
  goBack(){
    Inc.back(1);
  },

  /* 表单 */
  setVal(e){
    const name = e.currentTarget.dataset.name;
    const val = e.detail.value;
    this.setData({ ['fromData.'+name]:val });
  },

  /* 登录 */
  login(){
    // 验证
    const tel = this.data.fromData.tel;
    const passwd = this.data.fromData.passwd;
    let reg_tel = Inc.reg('tel',tel);
    let reg_passwd = Inc.reg('passwd',passwd);
    if(reg_tel!==true) return Inc.toast(reg_tel);
    else if(reg_passwd!==true) return Inc.toast(reg_passwd);
    // 请求
    if(!this.data.subInfo.state) return false;
    this.setData({
      ['subInfo.state']:false,
      ['subInfo.text']:'正在登录',
    });
    const load = Inc.loading();
    Inc.post('user/login',{tel:tel,passwd:passwd},(res)=>{
      load.clear();
      this.setData({
        ['subInfo.state']:true,
        ['subInfo.text']:'登 录',
      });
      const d = res.data;
      if(d.code==0){
        // 状态
        this.store.data.isLogin = true;
        this.store.data.uInfo = d.info;
        this.update();
        Inc.storage.setItem('token',d.token);
        // 返回
        Inc.toast('登录成功');
        Inc.back(1);
      }else Inc.toast(d.msg);
    });
  },

});