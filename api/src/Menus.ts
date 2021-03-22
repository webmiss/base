import Env from '@/env'
/* 菜单配置 */
export default ()=>{
  return [
    {label:'公共接口', children:[
      {label:'首页',value:{
        url: Env.apiUrl+'', method: 'get',
        param: []
      }},
      {label:'会员', children:[
        {label: '登录',value:{
          url: Env.apiUrl+'user/login', method: 'post',
          param: [
            {key:'uname', val:'15000000000', text:'手机号码'},
            {key:'passwd', val:'123456', text:'密码'},
          ]
        }},
        {label: '获取用户信息',value:{
          url: Env.apiUrl+'user/token', method: 'post',
          param: [
            {key:'token', val:'', text:'Token'},
            {key:'uinfo', val:'1', text:'验证: 0 用户信息: 1'},
          ]
        }},
      ]},
    ]},
    {label:'权限', children:[
      {label:'验证Token',value:{
        url: Env.apiUrl+'demo/token', method: 'post',
        param: [
          {key:'token', val:'', text:'Token'},
        ]
      }},
      {label:'验证Url(有)',value:{
        url: Env.apiUrl+'demo/perm', method: 'post',
        param: [
          {key:'token', val:'', text:'Token'},
        ]
      }},
      {label:'验证Url(无)',value:{
        url: Env.apiUrl+'demo/list', method: 'post',
        param: [
          {key:'token', val:'', text:'Token'},
        ]
      }},
    ]},
  ];
}