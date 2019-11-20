<template>
  <div>
    <h2 class="res_title">状态码</h2>
    <pre class="res_ct"><code class="hljs json" v-html="code || '无'"></code></pre>
  </div>
</template>

<script>
export default {
  data(){
    return {
      code: {}
    }
  },
  mounted(){
    // 全部状态吗
    this.$ajax.get(this.$config.apiUrl+'index/allCode').then(res=>this.code=res.data.code==0?res.data.list:{}).catch(err=>this.code=err);
  },
}
</script>
