<template>
  <div class="wm-action">
    <div class="item" v-if="actions.length>0">{{actions.length}}</div>
    <div class="wm-action_title">{{store.menuName || store.system.title}}</div>
  </div>
</template>

<style scoped>
.wm-action{white-space: nowrap; display: inline-block; overflow: hidden; font-size: 14px; border-radius: 4px; line-height: 40px;}
.wm-action .item{cursor: pointer; display: inline-block; padding: 0 24px; height: 40px; border: #DCDFE6 1px solid; border-right: none; background-color: #FFF;}
.wm-action .item:hover{border-color: #C2E7B0; background-color: #F0F9EB; color: #6FB737;}
.wm-action_title{font-size: 16px; font-weight: 500;}
</style>

<script>
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
import Toast from '@/library/ui/ui-toast'
export default {
  name:'Action',
  props: {
    url: {type: String, default: ''},
    menus: {type: Array, default: []},
  },
  data(){
    return {
      store: this.$store.state,
      actions:[],
    }
  },
  watch:{
    url(val){
      this.getAction(this.url);
    },
  },
  mounted(){
    this.getAction(this.url);
  },
  methods:{

    /* 动作菜单 */
    getAction(url){
      Post('Sysmenusaction/getAction',{token:Storage.getItem('token'),url:url},(res)=>{
        const d = res.data;
        console.log(d);
        if(d.code==0){

        }else{
          Toast(d.msg);
        }
        // if(d.code==0){
        //   this.actions = d.menuAction;
        //   // 追加
        //   if(this.menus) for(let i in this.menus) this.actions.push(this.menus[i]);
        //   // 重置宽度
        //   setTimeout(()=>{
        //     let test = this.$refs.Action.$el;
        //     this.width = (test.offsetWidth+1)+'px';
        //     this.$store.state.action.width = this.width;
        //   },3000);
        // }
      });
    },

    /* 触发事件 */
    openAction(type){
      this.$store.state.action.type = type;
      // 重置
      setTimeout(()=>{
        this.$store.state.action.type = '';
      },1000);
    }

  }
}
</script>
