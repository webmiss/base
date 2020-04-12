<template>
  <div class="tabar_body" :class="mode=='dark'?'tabar_body_dark':''">
    <div class="tabar_item" :class="active==0?'tabar_item_active':''" @click="navClick(0)">
      <i class="icons icon_home"></i>
      <div class="name">首页</div>
    </div>
    <div class="tabar_item" :class="active==1?'tabar_item_active':''" @click="navClick(1)">
      <i class="icons icon_msg"></i><span class="redNum">2</span>
      <div class="name">消息</div>
    </div>
    <div class="tabar_item" :class="active==2?'tabar_item_active':''" @click="navClick(2)">
      <i class="icons icon_me"></i>
      <div class="name">我的</div>
    </div>
  </div>
</template>

<style scoped>
.tabar_body{position: fixed; z-index: 1; display: flex; bottom: 0; width: 100%; height: 50px; background-color: #FFF; box-shadow: 0 0 2px rgba(0,0,0,.1);}
.tabar_item{display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center;}
.tabar_item .icons{color: #999;}
.tabar_item .name{font-size: 10px; padding-top: 2px; color: #999;}
.tabar_item_active{color: #6FB737;}
.tabar_item_active .icons{color: #6FB737;}
.tabar_item_active .name{color: #6FB737;}

.tabar_body .redNum{margin: -20px 0 0 18px;}

.tabar_body_dark{background-color: #282828;}
</style>

<script>
export default {
  name: 'TabBar',
  model: {
    prop: "active",
    event: 'active',
  },
  props: {
    active: {type: Number, default: 0},
  },
  data(){
    return {
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
  },
  methods:{

    /* 切换菜单 */
    navClick(n){
      this.$emit('active',n);
      this.$emit('change',n);
    },

  }
}
</script>
