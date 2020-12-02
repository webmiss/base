
export default {
  data(){
    return {
      store: this.$store.state,
    }
  },
  computed: {
    // 动作菜单-监听
    actionType(){
      const name = this.store.action.name;
      const action = this.store.action.action;
      return name=='Demo'&&action?action:false;
    }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      console.log(val);
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.name = 'Demo';
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  mounted(){
  },
  methods:{

  },
}