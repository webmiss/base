import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
import RegRight from '@/library/reg/right'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'

export default defineComponent({
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 表单
    const form: any = {
      passwd1: '',
      passwd2: '',
    };
    return {state,form}
  },
  mounted(){
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      const passwd = this.form.passwd;
      const passwd1 = this.form.passwd1;
      const passwd2 = this.form.passwd2;
      // 验证
      let reg_passwd = RegRight('passwd',passwd);
      let reg_passwd1 = RegRight('passwd',passwd1);
      if(reg_passwd!=true){
        return Toast('原'+reg_passwd);
      }else if(reg_passwd1!=true){
        return Toast('新'+reg_passwd1);
      }else if(passwd1!=passwd2){
        return Toast('两次密码不一致！');
      }else if(passwd==passwd1){
        return Toast('不能与原密码相同！');
      }
      // 提交
      const load = Loading();
      Post(
        'userpasswd/edit',
        {token:Storage.getItem('token'), passwd:passwd, passwdNew:passwd1},
      (res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          // 重置表单
          this.form.passwd = '';
          this.form.passwd1 = '';
          this.form.passwd2 = '';
          // 退出登录
          this.state.isLogin = false;
          this.state.uInfo = {};
          Storage.setItem('token','');
        }
        return Toast(d.msg);
      });
    }

  },
});