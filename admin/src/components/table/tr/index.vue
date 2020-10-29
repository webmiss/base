<template>
  <tr class="wm-table_tr">
    <td width="32" class="checkbox wm-table_checkbox">
      <wm-checkbox :value="value"></wm-checkbox>
    </td>
    <slot></slot>
  </tr>
</template>

<style scoped>
.wm-table_tr{width: 100%;}
.wm-table_tr .checkbox{position: relative;}
.wm-table_tr .wm-checkbox{position: absolute;}
</style>

<script>
import wmCheckbox from '../../form/checkbox'
export default {
  name: 'TableRow',
  components: {wmCheckbox},
  props: {
    value: '', //checkbox[value]
  },
}
</script>