<template>
  <div :class="'wm-json_format_'+effect">
    <pre><code v-html="formatJson(json)"></code></pre>
  </div>
</template>

<style>
.wm-json_format_plain{overflow-y: auto; padding: 16px; background-color: #F4F6F8; color: #282B2E; border-radius: 4px;}
.wm-json_format_plain .key{color: #1990B8;}
.wm-json_format_plain .string{color: #595;}
.wm-json_format_plain .number{color: #CC7832;}
.wm-json_format_plain .null{color: #C92C2C;}
.wm-json_format_dark{padding: 16px; background-color: #282B2E; color: #FFF; border-radius: 4px;}
.wm-json_format_dark .key{color: #1990B8;}
.wm-json_format_dark .string{color: #595;}
.wm-json_format_dark .number{color: #CC7832;}
.wm-json_format_dark .null{color: #C92C2C;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'JsonFormat',
  props: {
    json: null, //数据: Object
    effect: {type: String, default: 'plain'}, //样式: plain、dark
  },
  methods:{

    /* 初始化 */
    formatJson(json: any){
      if (typeof json!=="string") json = JSON.stringify(json, undefined, 2);
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g,'>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: any) {
        let cls = 'number';
        if(/^"/.test(match)){
          cls = /:$/.test(match)?'key':'string';
        }else if(/true|false/.test(match)){
          cls = 'boolean';
        }else if(/null/.test(match)){
          cls = 'null';
        }
        return `<span class="${cls}">${match}</span>`;
      });
    },

  },
});
</script>