<template>
  <div class="wm-page_error_html" :style="{backgroundColor:bgColor}">
    <div class="wm-page_error_load" v-if="loading && !title"><i :class="icon"></i></div>
    <div class="wm-page_error_body" v-else>
      <div class="wm-page_error_icon">
        <i class="ui ui_error" :style="{color: iconColor}"></i>
      </div>
      <div class="wm-page_error_title">{{title}}</div>
      <div class="wm-page_error_text">{{text}}</div>
      <div class="wm-page_error_but" v-if="button">
        <button @click="sub()" :style="{color:butColor,borderColor:butColor,backgroundColor:buttonBg}">{{buttonText}}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading { 0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);} }
.wm-page_error_load{position: absolute; z-index: 100; margin: -20px 0 0 -20px; width: 40px; height: 40px; line-height: 40px; text-align: center; animation: loading 2s linear 0s infinite; left: 50%; top: 50%;}
.wm-page_error_load i{font-size: 32px; color: #6FB737;}
.wm-page_error_html{position: absolute; width: 100%; height: 100%; background-color: #FFF;}
.wm-page_error_body{position: fixed; z-index: 1; left: 50%; top: 50%; transform: translate(-50%,-50%); text-align: center;}
.wm-page_error_icon{padding: 8px;}
.wm-page_error_icon .ui{font-size: 64px; color: #999;}
.wm-page_error_title{font-size: 16px; line-height: 32px;}
.wm-page_error_text{font-size: 12px; color: #999; line-height: 24px;}
.wm-page_error_but{padding: 16px 0;}
.wm-page_error_but button{padding: 0 24px; line-height: 24px; font-size: 12px; color: #6FB737; border: #6FB737 1px solid; background-color: #FFF; border-radius: 16px;}
</style>

<script>
export default {
  name:'PopUp',
  props: {
    loading: {type: Boolean, default: true},
    title: {type: String, default: ''},
    text: {type: String, default: ''},
    icon: {type: String, default: 'ui ui_loading'},
    iconColor: {type: String, default: '#FF6600'},
    button: {type: Boolean, default: true},
    buttonText: {type: String, default: '刷新'},
    butColor: {type: String, default: '#6FB737'},
    buttonBg: {type: String, default: '#FFF'},
    bgColor: {type: String, default: '#F2F4F6'},
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{

    /* 提交 */
    sub(){
      this.$emit('change');
    }

  }
}
</script>