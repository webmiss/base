<template>
  <tr class="wm-table_title">
    <td width="32" class="checkbox" v-if="checkbox">
      <wm-checkbox :checked="checked" @update:checked="show=$event"></wm-checkbox>
    </td>
    <slot></slot>
  </tr>
</template>

<style>
.wm-table_title{font-size: 14px; font-weight: 600; color: #999;}
.wm-table_title td{border: none; line-height: 32px;}
.wm-table_title .checkbox{position: relative;}
.wm-table_title .wm-checkbox{position: absolute;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmCheckbox from '../../form/checkbox/index.vue'
export default defineComponent({
  name:'TableTitle',
  components: {wmCheckbox},
  props: {
    checkbox: {type: Boolean, default: true}, //多选
    checked: {type: Boolean, default: false}, //全选&不选
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  mounted(){
    this.show = this.checked;
  },
  watch: {

    // 全选&不选
    show(val: boolean){
      const obj = document.querySelectorAll('.wm-table_checkbox div.checked');
      for(let i=0; i<obj.length; i++){
        if(val) obj[i].classList.add("active");
        else obj[i].classList.remove("active");
      }
    },

  },
});
</script>