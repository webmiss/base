<template>
  <div class="wm-date" :style="{width:width}">
    <wm-input :value="value" @update:value="value=$event" :placeholder="placeholder" />
    <div class="wm-date_body">
      <div class="wm-date_arrow bottom"></div>
      <div class="wm-date_ct" @click="getDate()">暂不更新,点击获取今天</div>
    </div>
  </div>
</template>

<style>
.wm-date .wm-input{background-color: #FFF;}
</style>
<style scoped>
.wm-date{position: relative; line-height: 24px;}
.wm-date_body{display: none; position: absolute; z-index: 99;}
.wm-date:hover .wm-date_body{display: block;}
.wm-date_arrow{position: absolute; left: 36px; top: -8px; width: 0px; height: 0px; border: 8px solid; border-color: transparent;}
.wm-date_arrow.bottom{border-bottom-color: #DCDFE6;}
.wm-date_ct{width: 240px; margin-top: 8px; padding: 8px 16px; border: #DCDFE6 1px solid; background-color: #FFF; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,.1);}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import wmInput from '../input/index.vue'
import TimeDay from '../../../library/inc/time-day'
export default defineComponent({
  name: 'Date',
  components: {wmInput},
  props: {
    value: {type: String, default: ''},
    width: {type: String, default: '160px'},
    placeholder: {type: String, default: '选择日期'},
  },
  mounted(){
  },
  methods:{

    /* 点击 */
    getDate(){
      const day = TimeDay(0);
      this.$emit('update:value',day);
    }

  },
});
</script>