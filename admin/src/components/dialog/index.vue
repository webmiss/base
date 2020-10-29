<template>
  <wm-popup class="wm-dialog" :show="show" @update:show="updateShow" :bgClose="bgClose">
    Dialog
  </wm-popup>
</template>

<style scoped>
.wm-dialog{}
</style>

<script>
import wmPopup from '../popup'
export default {
  name: 'Dialog',
  components: {wmPopup},
  props: {
    show: {type: Boolean, default: false}, //是否显示
    bgClose: {type: Boolean, default: false},  //点击背景关闭
  },
  mounted(){
  },
  methods:{

    /* 更新状态 */
    updateShow(val){
      this.$emit('update:show',val);
    },

  },
}
</script>