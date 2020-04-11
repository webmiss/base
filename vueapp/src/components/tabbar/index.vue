<template>
  <div class="tabar_body">
    <div class="tabar_item" :class="active==0?'tabar_item_active':''" @click="navClick(0)">
      <i class="icons icon_home"></i>
      <div class="name">首页</div>
    </div>
    <div class="tabar_item" :class="active==1?'tabar_item_active':''" @click="navClick(1)">
      <i class="icons icon_msg"></i>
      <div class="name">消息</div>
    </div>
    <div class="tabar_item" :class="active==2?'tabar_item_active':''" @click="navClick(2)">
      <i class="icons icon_me"></i>
      <div class="name">我的</div>
    </div>
  </div>
</template>

<style scoped>
.tabar_body{position: fixed; display: flex; bottom: 0; width: 100%; height: 50px; background-color: #FFF;}
.tabar_item{display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center;}
.tabar_item .icons{font-size: 22px;}
.tabar_item .name{font-size: 10px; padding-top: 2px;}
.tabar_item_active{color: #6FB737;}
.tabar_item_active .icons{color: #6FB737;}
</style>

<script>
export default {
  name: 'TabBar',
  props: {
    // immersed: {type: Boolean, default: false},
    // color: {type: String, default: Env.statusBar.color},
    // bgColor: {type: String, default: Env.statusBar.bgColor},
  },
  data(){
    return {
      active: 0,
    }
  },
  mounted(){
  },
  methods:{

    /* 切换菜单 */
    navClick(n){
      this.active = n;
    },

  }
}
</script>
