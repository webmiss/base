<template>
  <div class="wm-checkbox" @click="$emit('update:checked',checked=!checked)">
    <div class="checked" :class="checked?'active':''">
      <input type="checkbox" class="checkbox" :value="value">
    </div>
    <div v-if="label" class="name">label</div>
  </div>
</template>

<style scoped>
.wm-checkbox{position: relative; cursor: pointer; display: inline-block; white-space: nowrap; line-height: 32px; padding: 0 8px;}
.wm-checkbox div{display: inline-block;}
.wm-checkbox .checked{position: absolute; top: 50%; margin-top: -8px; width: 14px; height: 14px; border: #DCDFE6 1px solid; background-color: #F2F4F6; border-radius: 2px;}
.wm-checkbox .name{padding-left: 24px; font-size: 14px;}
.wm-checkbox:hover{background-color: #F6F8FA; border-radius: 4px;}
.wm-checkbox:hover .checked{border-color: #595;}
.wm-checkbox .active{border-color: #595; background-color: #6FB737;}
.wm-checkbox .active:after{content: ""; position: absolute; width: 4px; height: 8px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 4px; top: 2px; transform-origin: center; transform: rotate(45deg) scaleY(1);}
.wm-checkbox .checkbox{display: none;}
</style>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {type: String, default: ''}, //checkbox[value]
    label: {type: String, default: ''}, //名称
    checked: {type: Boolean, default: false}, //是否选中
  },
}
</script>