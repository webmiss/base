<template>
  <el-row v-if="actions.length" class="action" :style="{minWidth:width}">
    <el-button-group ref="Action">
      <el-button v-for="val in actions" :key="val.name" :icon="val.ico" @click="openAction(val.action)">{{val.name}}</el-button>
    </el-button-group>
  </el-row>
</template>

<script>
import {Post,Storage} from '@/library/ui'
export default {
  name:'ImageView',
  props: {
    url: {type: String, default: ''},
    menus: '',
  },
  data(){
    return {
      width: '1200px',
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
      Post('Usermain/getMenusAction',{token:Storage.getItem('token'),url:url},(res)=>{
        const d = res.data;
        if(d.code==0){
          this.actions = d.menuAction;
          // 追加
          if(this.menus) for(let i in this.menus) this.actions.push(this.menus[i]);
          // 重置宽度
          setTimeout(()=>{
            let test = this.$refs.Action.$el;
            this.width = (test.offsetWidth+1)+'px';
            this.$store.state.action.width = this.width;
          },3000);
        }
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
