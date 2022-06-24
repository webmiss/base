<template>
  <ul class="wm-checkbox_group">
    <li v-for="(v,k) in data" :key="k">
      <wm-checkbox :label="v.label" :checked="v.checked" @update:checked="getValue(k, $event)" :disabled="v.disabled"></wm-checkbox>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.wm-checkbox_group{display: inline-block; margin: 4px 0;}
.wm-checkbox_group li{float: left; height: 26px; line-height: 26px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import wmCheckbox from './index.vue'
export default defineComponent({
  name: 'CheckboxGroup',
  components: {wmCheckbox},
  props: {
    value: {type: Array, default: []},    //获取值
    data: {type: Array, default: []},     //数据: [{label:'游戏', value: 1},{label:'购物', value: 2, checked: true},{label:'其他', value: 3, disabled: true}]
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  mounted(){
    this.getValue();
  },
  methods:{

    /* 获取值 */
    getValue(k?: any, v?: any){
      let value: any = [];
      const data: any = this.data;
      for(let i in this.data){
        if(i==k) data[i].checked = v;
        if(data[i].checked) value.push(data[i].value);
      }
      this.$emit('update:value', value);
    },

  }
});
</script>