<template>
  <div class="wm-tabbar" :style="{height: height}">
    <div class="wm-tabbar_item" v-for="(val,key) in data" :key="key" @click="clickMenu(key,val)">
      <i class="icon" :class="val.icon" :style="{color: active==key?activeColor:''}"></i>
      <span class="name" :style="{color: active==key?activeColor:''}">{{val.lable}}</span>
    </div>
  </div>
</template>

<style scoped>
.wm-tabbar{user-select: none; display: flex; position: fixed; width: 100%; z-index: 10; bottom: 0; height: 100%; box-shadow: 0 -1px 0 rgba(0,0,0,.04);}
.wm-tabbar_item{display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center;}
.wm-tabbar_item .icon{color: #999; font-size: 24px;}
.wm-tabbar_item .name{font-size: 10px; padding-top: 2px; color: #999;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Env from '../../env'
export default defineComponent({
  name: 'Tabbar',
  props: {
    data: {type: Object, default: []},                        //数据: [{lable: '首页', icon: 'icons icon_home'}]
    active: {type: Number, default: 0},                       //默认菜单
    activeColor: {type: String, default: Env.themes.primary}, //默认菜单
    height: {type: String, default: '54px'},                  //高度
  },
  methods:{

    /* 点击菜单 */
    clickMenu(index: number, data: object){
      this.$emit('update:active',index,data);
    },

  }
});
</script>
