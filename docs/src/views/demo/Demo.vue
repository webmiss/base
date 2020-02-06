<template>
  <Request :api="api" :method="method" :parameter="parameter" :remark="remark"></Request>
</template>

<script>
import Request from '@/components/Request'
export default {
  components: {Request},
  data(){
    return {
      // 请求地址
      api: this.$config.apiUrl+'test',
      // 方式
      method: 'post',
      // 参数
      parameter: [
        {key:'token',val:this.$config.token,text:'Token（必填）'},
        {key:'id',val:1,text:'ID（必填）'},
        {key:'name',val:'张三',text:'姓名'},
      ],
      // 说明
      remark:{
        list:{
          id: '用户ID',
          name: '姓名',
        }
      }
    }
  }
}
</script>
