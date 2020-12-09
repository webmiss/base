<template>
  <div class="wm-action">
    <template v-if="action.length>0" >
      <div class="item" v-for="(val,key) in action" :key="key" @click="openAction(val.action)">{{val.name}}</div>
    </template>
    <div class="wm-action_title">{{store.menuName || store.system.title}}</div>
  </div>
</template>

<style scoped>
.wm-action{white-space: nowrap; display: inline-block; overflow: hidden; padding-right: 1px; font-size: 14px; border-radius: 4px; height: 40px; line-height: 40px; box-sizing: border-box;}
.wm-action .item{user-select: none; cursor: pointer; display: inline-block; margin-right: -1px; padding: 0 24px; height: 38px; border: #DCDFE6 1px solid; background-color: #FFF;}
.wm-action .item:hover{border-color: #C2E7B0; background-color: #F0F9EB; color: #6FB737;}
.wm-action_title{font-size: 16px; font-weight: 500;}
</style>

<script>
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
import Toast from '@/library/ui/ui-toast'
export default {
  name: 'Action',
  props: {
    url: {type: String, default: ''},
    menus: '',
  },
  data(){
    return {
      store: this.$store.state,
      action:[],
    }
  },
  watch:{
    url(val){
      this.getAction(this.url);
    },
  },
  mounted(){
  },
  methods:{

    /* 动作菜单 */
    getAction(url){
      this.action = [];
      if(!url || !Storage.getItem('token')) return false;
      Post('Sysmenusaction/getAction',{token:Storage.getItem('token'),url:url},(res)=>{
        const d = res.data;
        if(d.code==0){
          this.action = d.action;
          // 追加菜单
          if(this.menus) for(let i in this.menus) this.action.push(this.menus[i]);
        }else{
          Toast(d.msg);
        }
      });
    },

    /* 触发事件 */
    openAction(val){
      this.store.action.action = val;
      // 重置
      setTimeout(()=>{ this.store.action.action = ''; },1000);
    }

  }
}
</script>
