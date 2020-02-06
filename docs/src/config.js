/*
* 全局配置文件
*/
export default function install(Vue){

  const baseUrl = 'https://api.webmis.vip/';
  const token = 'token';
  const apiUrl = baseUrl+'api/';
  const adminUrl = baseUrl+'admin/';
  const appName = 'WebMIS';
  const appVersion = 'v 1.0.0';
  
  // 配置
  Vue.prototype.$config = {name:appName, version: appVersion, apiUrl: apiUrl, adminUrl: adminUrl, token: token}

  /* 菜单管理 */
  Vue.prototype.$menus = [
    // 首页
    {title:'首页',menus:[
      {title:'使用说明',url:'/',menus:[]},
    ]},
    {title:'APP',menus:[
      {title:'测试',menus:[
        // 案例
        {title:'案例',menus:[],url:'/Demo'},
        // 案例2
        {title:'案例2',menus:[],name:'Test2',data:{
          api: apiUrl+'test2',
          method: 'post',
          parameter: [
            {key:'token',val:token,text:'Token（必填）'},
            {key:'id',val:1,text:'ID（必填）'},
            {key:'name',val:'张三2',text:'姓名'},
          ],
          remark:{list:{id: '用户ID',name: '姓名',}},
        }},
        // 案例3
        {title:'案例3',menus:[],name:'Test3',data:{
          api: apiUrl+'test3',
          method: 'post',
          parameter: [
            {key:'token',val:token,text:'Token（必填）'},
            {key:'id',val:1,text:'ID（必填）'},
            {key:'name',val:'张三3',text:'姓名'},
          ],
          remark:{list:{id: '用户ID',name: '姓名',}},
        }},
      ]},
    ]},
  ];

}