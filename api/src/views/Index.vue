<template>
  <div>
    <h2 class="res_title">状态码</h2>
    <pre class="res_ct"><code class="hljs json" v-html="code || '无'"></code></pre>
  </div>
</template>

<script>
import Inc from '@/library/Inc'
export default {
  data(){
    return {
      code: {}
    }
  },
  mounted(){
    // 全部状态吗
    Inc.get('index/allCode',{},(res)=>{
      const d = res.data;
      this.code=d.code==0?d.list:{}
    },(err)=>{
      this.code=err
    });
  },
}
</script>
