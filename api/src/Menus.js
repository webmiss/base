const token = '';
const menus = [
  // 首页
  {title:'首页',menus:[
    {title:'使用说明',url:'/',menus:[]},
  ]},
  {title:'APP',menus:[
    {title:'测试',menus:[
      // 案例1
      {title:'案例1',menus:[],name:'Test1',data:{
        api: 'test1', method: 'post',
        parameter: [
          {key:'token',val:'',text:'Token（必填）'},
          {key:'id',val:1,text:'ID（必填）'},
          {key:'name',val:'张三1',text:'姓名'},
        ],
        remark:{list:{id: '用户ID',name: '姓名',}},
      }},
    ]},
  ]},
];
export default menus