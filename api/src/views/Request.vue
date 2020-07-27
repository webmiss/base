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
import Env from '@/env'
import {Storage,Get,Post,Put,Delete,Request} from '@/library/ui'
export default {
  data(){
    return {
      LabelWidth: '100px',
      url: Env.apiUrl, //接口
      api: '',  //地址
      method: '', //方式
      parameter: [],  //参数
      remark: {}, //说明
      response: '', //结果
    }
  },
  watch: {
    "$route": "getData"
  },
  created(){
    this.getData();
  },
  methods:{

    /* 数据 */
    getData(){
      let data = this.$store.state.request;
      data = data?data:JSON.parse(Storage.getItem('Request'));
      this.api = Env.apiUrl+data.api;
      this.method = data.method;
      this.parameter = data.parameter;
      this.remark = data.remark;
    },

    /* 提交 */
    onSubmit(){
      // 参数
      let param = this.parameter;
      let data={};
      for(let i in param){
        data[param[i].key] = param[i].val;
      }
      // 请求
      this.response = '正在请求...';
      if(this.method=='get'){
        Get(this.api,data,res=>this.response=res.data,err=>this.response=err);
      }else if(this.method=='post'){
        Post(this.api,data,res=>this.response=res.data,err=>this.response=err);
      }else if(this.method=='put'){
        Put(this.api,data,res=>this.response=res.data,err=>this.response=err);
      }else if(this.method=='delete'){
        Delete(this.api,data,res=>this.response=res.data,err=>this.response=err);
      }else if(this.method=='request'){
        Request(this.api,data,res=>this.response=res.data,err=>this.response=err);
      }
    },

  }
}
</script>