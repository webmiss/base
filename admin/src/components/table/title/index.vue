<template>
  <tr class="wm-table_title">
    <td width="32" class="checkbox">
      <wm-checkbox :checked="checked" @update:checked="checked=$event"></wm-checkbox>
    </td>
    <slot></slot>
  </tr>
</template>

<style>
.wm-table_title{font-size: 14px; font-weight: 600; color: #999;}
.wm-table_title td{border: none; line-height: 48px;}
.wm-table_title .checkbox{position: relative;}
.wm-table_title .wm-checkbox{position: absolute;}
</style>

<script>
import wmCheckbox from '../../form/checkbox'
export default {
  name:'TableTitle',
  components: {wmCheckbox},
  props: {
    checked: {type: Boolean, default: false}, //全选&不选
  },
  watch: {

    // 全选&不选
    checked(val){
      const obj = document.querySelectorAll('.wm-table_checkbox div.checked');
      for(let i=0; i<obj.length; i++){
        if(val) obj[i].classList.add("active");
        else obj[i].classList.remove("active");
      }
    },

  },
}
</script>