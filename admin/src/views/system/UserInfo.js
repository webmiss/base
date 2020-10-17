/* 组件 */
import wmMain from '../../components/main'
import wmForm from '../../components/form'
import wmFormTitle from '../../components/form/title'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/input'
import wmButton from '../../components/button'

export default {
  components: {wmMain,wmForm,wmFormTitle,wmFormItem,wmInput,wmButton},
  data(){
    return {
      store: this.$store.state,
      form:{img:'',nickname:'',name:'',gender:'',birthday:'',position:''},
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      console.log('sub');
    },

  },
}