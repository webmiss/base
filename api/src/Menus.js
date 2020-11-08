import Env from './env'
/* 菜单配置 */
export default ()=>{
  return [
    {title:'公共接口', children:[
      {title:'首页',data:{
        url: Env.apiUrl+'index/index', method: 'post',
        param: [
          {key:'token', val:Env.token, text:'Token（必填）'},
          {key:'name', val:Env.token, text:'WebMIS'},
        ]
      }},
      {title:'测试',data:{
        url: Env.apiUrl+'index/test', method: 'get',
        param: [
          {key:'test', val:'', text:'测试'},
        ]
      }},
    ]},
    {title:'业务', children:[
      {title:'测试接口',data:{
        url: Env.apiUrl+'test/test', method: 'put',
        param: [
          {key:'test', val:'', text:'测试'},
        ]
      }},
    ]},
  ];
}