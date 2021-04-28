<template>
  <div>
    <div class="wm-radio_item" v-for="(val,key) in data" :key="key" @click="$emit('update:value',val.val)">
      <div class="checked" :class="val.checked?'active':''"></div>
      <div class="name">{{val.name}}</div>
    </div>
  </div>
</template>

<style scoped>
.wm-radio_item{position: relative; cursor: pointer; display: inline-block; white-space: nowrap; line-height: 32px; padding: 0 16px 0 8px;}
.wm-radio_item div{display: inline-block;}
.wm-radio_item .checked{position: absolute; top: 50%; margin-top: -8px; width: 16px; height: 16px; border: #DCDFE6 1px solid; background-color: #F2F4F6; border-radius: 50%;}
.wm-radio_item .name{padding-left: 24px; font-size: 14px;}
.wm-radio_item:hover{background-color: #F6F8FA; border-radius: 4px;}
.wm-radio_item:hover .checked{border-color: #595;}
.wm-radio_item .active{border-color: #595; background-color: #6FB737;}
.wm-radio_item .active::after{content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 5px; height: 5px; background-color: #FFF; border-radius: 50%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Radio',
  props: {
    data: {type: Array, default: []}, //数据: [{name:'男',val:'男'},{name:'女',val:'女'}]
    value: {type: String, default: ''}, //默认值: val
  },
  watch:{
    value(val){
      this.radioClick(val);
    }
  },
  mounted(){
    if(this.value) this.radioClick(this.value);
  },
  methods:{

    /* 点击 */
    radioClick(val: string){
      let v: any;
      for(v of this.data){
        v.checked = false;
        // 勾选
        if(v.val==val) v.checked = true;
      }
    },

  },
});
</script>