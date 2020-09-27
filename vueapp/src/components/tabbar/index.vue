<template>
  <div class="tabar_body" :class="mode=='dark'?'tabar_body_dark':''">
    <div class="tabar_item" :class="active==0?'tabar_item_active':''" @click="navClick(0)">
      <i class="icons icon_home"></i>
      <div class="name">首页</div>
    </div>
  </div>
</template>

<style scoped>
.tabar_body{user-select: none; position: fixed; z-index: 1; display: flex; bottom: 0; width: 100%; height: 48px; background-color: #FFF; box-shadow: 0 0 2px rgba(0,0,0,.1);}
.tabar_item{display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center;}
.tabar_item .icons{color: #999;}
.tabar_item .name{font-size: 10px; padding-top: 2px; color: #999;}
.tabar_item_active{color: #6FB737;}
.tabar_item_active .icons{color: #6FB737;}
.tabar_item_active .name{color: #6FB737;}
.tabar_item_active .icon_home{font-size: 22px;}

.tabar_body .redNum{margin: -20px 0 0 18px;}

.tabar_body_dark{background-color: #323436;}
</style>

<script>
export default {
  name: 'TabBar',
  props: {
    active: {type: Number, default: 0},
  },
  computed:{
    mode(){ return this.$store.state.mode; },
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
