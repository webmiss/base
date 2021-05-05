<template>
  <div class="wm-action">
    <template v-if="state.action.menus.length>0" >
      <div class="item" v-for="(val,key) in state.action.menus" :key="key" @click="openAction(val.action)">{{val.name}}</div>
    </template>
    <div class="wm-action_title">{{state.action.title || state.system.title}}</div>
  </div>
</template>

<style scoped>
.wm-action{white-space: nowrap; display: inline-block; overflow: hidden; padding-right: 1px; font-size: 14px; border-radius: 4px; height: 40px; line-height: 40px; box-sizing: border-box;}
.wm-action .item{user-select: none; cursor: pointer; display: inline-block; margin-right: -1px; padding: 0 24px; height: 38px; border: #DCDFE6 1px solid; background-color: #FFF;}
.wm-action .item:hover{border-color: #C2E7B0; background-color: #F0F9EB; color: #6FB737;}
.wm-action_title{font-size: 16px; font-weight: 500;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Action',
  props: {
    menus: {type: Array, default: []},
  },
  data(){
    const store: any = useStore();
    const state: any = store.state;
    const action: any = [];
    return {state,action}
  },
  methods:{

    /* 触发事件 */
    openAction(val: string){
      this.state.action.active = val;
      // 重置
      setTimeout(()=>{ this.state.action.active = ''; },1000);
    }

  }
});
</script>
