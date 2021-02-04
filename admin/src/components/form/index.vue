<template>
  <div ref="form">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Form',
  props: {
    labelWidth: {type: String, default: '90px'},
    labelHeight: {type: String, default: '40px'},
  },
  mounted(){
    this.init();
  },

  methods:{

    /* 初始化 */
    init(){
      // 设置宽度
      const form: any = this.$refs.form;
      const label: any = form.getElementsByTagName('label');
      const body: any = form.getElementsByClassName('wm-form_item_body');
      for(let i=0; i<label.length; i++){
        label[i].style.width = this.labelWidth;
        body[i].style.marginLeft = this.labelWidth;
        label[i].style.height = this.labelHeight;
      }
    },

  },
});
</script>