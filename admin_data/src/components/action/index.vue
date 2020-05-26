<template>
  <el-row v-if="actions.length" class="action">
    <el-button-group>
      <el-button v-for="val in actions" :key="val.name" :icon="val.ico" @click="openAction(val.action)">{{val.name}}</el-button>
    </el-button-group>
  </el-row>
</template>

<script>
import Inc from '@/library/Inc'
export default {
  name:'ImageView',
  props: {
    url:{type: String, default: ''},
  },
  data(){
    return {
      actions:[],
    }
  },
  mounted(){
    if(!this.url) return Inc.toast('验证菜单不能为空!');
    this.getAction(this.url);
  },
  methods:{

    /* 动作菜单 */
    getAction(url){
      Inc.post('Usermain/getMenusAction',{token:Inc.storage.getItem('token'),url:url},(res)=>{
        const d = res.data;
        if(d.code==0) this.actions = d.menuAction;
      });
    },

    /* 触发事件 */
    openAction(action){
      this.$emit('action',action);
    }

  }
}
</script>
