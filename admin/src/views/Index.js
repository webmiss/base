
export default {
  data(){
    return {
      store: this.$store.state,
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  mounted(){
  },
  methods:{

  }
}