<template>
  <div class="wm-table_order checked" @click.stop="OrderBy()">
    <i class="ui ui_arrow_up icon1" :class="value=='ASC'?'checked':''"></i>
    <i class="ui ui_arrow_down icon2" :class="value=='DESC'?'checked':''"></i>
  </div>
</template>

<style lang="less" scoped>
.wm-table_order{cursor: pointer; position: absolute; top: 0; right: 0; width: 16px; height: 100%; line-height: 100%;}
.wm-table_order:hover{background-color: @Hover;}
.wm-table_order i{position: absolute; font-size: 12px; font-weight: normal; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(0.8);}
.wm-table_order .icon1{color: @IconColor; z-index: 1; margin-top: -3px;}
.wm-table_order .icon2{color: @IconColor; z-index: 2; margin-top: 3px;}
.wm-table_order .checked{color: @Primary; font-weight: bold;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Table',
  components: {},
  props: {
    value: {default: ''},      //值: ''、ASC、DESC
  },
  methods:{

    /* 点击 */
    OrderBy(){
      if(this.value=='ASC') this.$emit('update:value', 'DESC');
      else if(this.value=='DESC') this.$emit('update:value', '');
      else this.$emit('update:value', 'ASC');
    },

  },
});
</script>