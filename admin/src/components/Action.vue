<template>
  <el-row v-if="actions.length" class="action">
    <el-button-group>
      <el-button v-for="val in actions" :key="val.name" :icon="val.ico" @click="openAction(val.action)">{{val.name}}</el-button>
    </el-button-group>
  </el-row>
</template>

<script>
export default {
  name:'Action',
  props: ['url'],
  data(){
    return {
      actions:[],
    }
  },
  mounted(){
    this.getAction(this.url);
  },
  methods:{

    /* 动作菜单 */
    getAction(url){
      this.$ajax.post(
        this.$config.apiUrl+'UserMain/getMenusAction',
        'token='+this.$storage.getItem('token')+'&url='+url
      ).then((res)=>{
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
