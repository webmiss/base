<template>
  <tr class="wm-table_tr">
    <td width="32" class="checkbox wm-table_checkbox" v-if="checkbox">
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

<script lang="ts">
import { defineComponent } from 'vue'
import wmCheckbox from '../../form/checkbox/index.vue'
export default defineComponent({
  name: 'TableRow',
  components: {wmCheckbox},
  props: {
    checkbox: {type: Boolean, default: true}, //多选
    value: {default:''},                      //checkbox[value]
  },
});
</script>