import Env from './env'
/* 菜单配置 */
export default ()=>{
  return [
    {label:'公共接口', children:[
      {label:'首页',value:{
        url: Env.apiUrl+'index/index', method: 'post',
        param: [
          {key:'token', val:Env.token, text:'Token（必填）'},
          {key:'name', val:Env.token, text:'WebMIS'},
        ]
      }},
      {label:'分组', children:[
        {label: '测试1',value:{
          url: Env.apiUrl+'index/test', method: 'get',
          param: [
            {key:'test', val:'', text:'测试'},
          ]
        }},
        {label: '测试2',value:{
          url: Env.apiUrl+'index/test', method: 'post',
          param: [
            {key:'test', val:'', text:'测试'},
          ]
        }},
      ]},
    ]},
    {label:'业务', children:[
      {label:'测试接口',value:{
        url: Env.apiUrl+'test/test', method: 'put',
        param: [
          {key:'test', val:'', text:'测试'},
        ]
      }},
    ]},
  ];
}