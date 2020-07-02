<template>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.$router.replace(from.path);
    });
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = '';
    this.$store.state.action.menus = '';
  },
}
</script>