<template>
  <div>
    <!-- 请求 -->
    <el-form :label-width="LabelWidth">
      <el-form-item label="请求地址">
        <el-input v-model="api" placeholder="请输入请求地址" style="max-width: 420px;"></el-input>
        <el-button type="primary" @click="onSubmit()">发 送</el-button>
      </el-form-item>
      <el-form-item label="方式">
        <el-radio-group v-model="method">
          <el-radio label="get"></el-radio>
          <el-radio label="post"></el-radio>
          <el-radio label="put"></el-radio>
          <el-radio label="delete"></el-radio>
          <el-radio label="request"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="(val,key) in parameter" :key="key" :label="val.key">
        <el-tooltip class="item" effect="dark" :content="val.text" placement="right-start">
          <el-input v-model="val.val" :placeholder="val.text" style="max-width: 320px;"></el-input>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <!-- 响应 -->
    <h2 class="res_title">返回结果</h2>
    <pre class="res_ct"><code class="hljs json" v-html="response || '无'"></code></pre>
    <!-- 说明 -->
    <h2 class="res_title">参数说明</h2>
    <pre class="res_ct"><code class="hljs json" v-html="remark || '无'"></code></pre>
  </div>
</template>

<script>
export default {
  data(){
    return {
      LabelWidth: '100px',
      // 请求地址
      api: '',
      // 方式
      method: '',
      // 参数
      parameter: [],
      // 说明
      remark: {},
      // 结果
      response: '',
    }
  },
  created(){
    this.getData();
  },
  watch: {
    "$route": "getData"
  },
  methods:{

    /* 数据 */
    getData(){
      let data = JSON.parse(this.$storage.getItem('Request'));
      this.api = data.api;
      this.method = data.method;
      this.parameter = data.parameter;
      this.remark = data.remark;
    },

    /* 提交 */
    onSubmit(){
      // 参数
      let param = this.parameter;
      let data={},url='';
      for(let i in param){
        data[param[i].key] = param[i].val;
        url += param[i].key+'='+param[i].val+'&'
      }
      url = url.slice(0,-1);
      // 请求
      this.response = '正在请求...';
      if(this.method=='get'){
        this.$ajax.get(this.api,{params:data}).then(res=>this.response=res.data).catch(err=>this.response=err);
      }else if(this.method=='post'){
        this.$ajax.post(this.api,url).then(res=>this.response=res.data).catch(err=>this.response=err);
      }else if(this.method=='put'){
        this.$ajax.put(this.api,url).then(res=>this.response=res.data).catch(err=>this.response=err);
      }else if(this.method=='delete'){
        this.$ajax.delete(this.api,{params:data}).then(res=>this.response=res.data).catch(err=>this.response=err);
      }else if(this.method=='request'){
        this.$ajax.request(this.api,{params:data}).then(res=>this.response=res.data).catch(err=>this.response=err);
      }
    },

  }
}
</script>