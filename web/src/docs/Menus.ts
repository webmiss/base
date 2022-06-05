/* 菜单 */
export default [

  /* Vue */
  {label:'Vue', value:'vue', children:[
    {label:'Vue项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:''},
      {label: '安装&运行', value: 'index', key:''},
      {label: '打包&发布', value: 'build', key:''},
      {label: '字体图标', value: 'icons', key:''},
    ]},
    {label:'App组件', value:'app', children:[
      {label: 'Chart 图表', value: 'chart', key:''},
      {label: 'Loading 动画', value: 'loading', key:''},
      {label: 'PageView 页面容器', value: 'page-view', key:''},
      {label: 'ScrollView 滑动容器', value: 'scroll-view', key:''},
      {label: 'Popup 弹出层', value: 'popup', key:''},
      {label: 'Picker 选择器', value: 'picker', key:''},
      {label: 'Swipe 轮播图', value: 'swipe', key:''},
      {label: 'TabBar 导航菜单', value: 'tabbar', key:''},
      {label: 'Touch 手势', value: 'touch', key:''},
    ]},
    {label:'Admin组件', value:'admin', children:[
      {label: 'Action 动作菜单', value: 'action', key:''},
      {label: 'Dialog 对话框', value: 'dialog', key:''},
      {label: 'Form 表单', value: 'form', key:''},
      {label: 'Img 图片', value: 'img', key:''},
      {label: 'Loading 动画', value: 'loading', key:''},
      {label: 'Main 布局', value: 'main', key:''},
      {label: 'Page 分页', value: 'page', key:''},
      {label: 'Popup 弹出层', value: 'popup', key:''},
      {label: 'Popover 弹出框', value: 'popover', key:''},
      {label: 'ScrollView 滑动层', value: 'scrollview', key:''},
      {label: 'Switch 开关', value: 'switch', key:''},
      {label: 'Table 表格', value: 'table', key:''},
      {label: 'Tag 标签', value: 'tag', key:''},
      {label: 'TinyMCE 编辑器', value: 'tinymce', key:''},
      {label: 'Tree 树形控件', value: 'tree', key:''},
      {label: 'Uploader 上传', value: 'uploader', key:''},
    ]},
    {label:'Library模块', value:'library', children:[
      {label: 'Ui 界面', value: 'ui', key:''},
      {label: 'Request 请求', value: 'request', key:''},
      {label: 'Storage 本地硬盘', value: 'storage', key:''},
      {label: 'Array 数组', value: 'array', key:''},
      {label: 'Base64 编码&解码', value: 'base64', key:''},
      {label: 'Device 设备', value: 'device', key:''},
      {label: 'Down 文件下载', value: 'down', key:''},
      {label: 'Html 标签', value: 'html', key:''},
      {label: 'Price 金额', value: 'price', key:''},
      {label: 'Reg 正则验证', value: 'reg', key:''},
      {label: 'Tel 手机号码', value: 'tel', key:''},
      {label: 'Time 时间', value: 'time', key:''},
      {label: 'URL 编码&解码', value: 'url', key:''},
    ]},
    {label:'Plus模块', value:'plus', children:[
      {label: 'Plus 公共', value: 'plus', key:''},
      {label: 'Camera 相机', value: 'camera', key:''},
      {label: 'Img 图片', value: 'img', key:''},
      {label: 'Map 地图', value: 'map', key:''},
      {label: 'Notify 本地消息', value: 'notify', key:''},
    ]},
  ]},

  /* Flutter */
  {label:'Flutter', value:'flutter', children:[
    {label:'Flutter项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:''},
      {label: '安装&运行', value: 'index', key:''},
      {label: '打包&发布', value: 'build', key:''},
    ]},
  ]},

  /* Phalcon */
  {label:'Phalcon', value:'phalcon', children:[
    {label:'Phalcon项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:''},
      {label: '安装&运行', value: 'index', key:''},
      {label: '打包&发布', value: 'build', key:''},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:''},
      {label: '数据 Data', value: 'data', key:''},
      {label: '日志 Logs', value: 'logs', key:''},
      {label: '验证 Token', value: 'token', key:''},
      {label: '通信 Socket', value: 'socket', key:''},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:''},
      {label: '查询 Select', value: 'select', key:''},
      {label: '插入 Insert', value: 'insert', key:''},
      {label: '更新 Update', value: 'update', key:''},
      {label: '删除 Delete', value: 'delete', key:''},
      {label: '连表 Join', value: 'join', key:''},
      {label: '事务 Commit', value: 'commit', key:''},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:''},
      {label: '导出 Export', value: 'export', key:''},
      {label: '二维码 Qrcode', value: 'qrcode', key:''},
      {label: '缓存 Redis', value: 'redis', key:''},
      {label: '安全验证 Safety', value: 'safety', key:''},
      {label: '通信 WebSocket', value: 'socket', key:''},
      {label: '文件上传 Upload', value: 'upload', key:''},
      
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:''},
      {label: '编码/解码 URL', value: 'url', key:''},
      {label: '编码/解码 Base64', value: 'base64', key:''},
      {label: '加密算法 Hash', value: 'hash', key:''},
      {label: '类型转换 Type', value: 'type', key:''},
      {label: '设备信息 Os', value: 'os', key:''},
    ]},
  ]},

  /* Flask */
  {label:'Flask', value:'python', children:[
    {label:'Python项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:''},
      {label: '安装&运行', value: 'index', key:''},
      {label: '打包&发布', value: 'build', key:''},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:''},
      {label: '数据 Data', value: 'data', key:''},
      {label: '日志 Logs', value: 'logs', key:''},
      {label: '验证 Token', value: 'token', key:''},
      {label: '通信 Socket', value: 'socket', key:''},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:''},
      {label: '查询 Select', value: 'select', key:''},
      {label: '插入 Insert', value: 'insert', key:''},
      {label: '更新 Update', value: 'update', key:''},
      {label: '删除 Delete', value: 'delete', key:''},
      {label: '连表 Join', value: 'join', key:''},
      {label: '事务 Commit', value: 'commit', key:''},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:''},
      {label: '导出 Export', value: 'export', key:''},
      {label: '二维码 Qrcode', value: 'qrcode', key:''},
      {label: '缓存 Redis', value: 'redis', key:''},
      {label: '安全验证 Safety', value: 'safety', key:''},
      {label: '通信 WebSocket', value: 'socket', key:''},
      {label: '文件上传 Upload', value: 'upload', key:''},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:''},
      {label: '编码/解码 URL', value: 'url', key:''},
      {label: '编码/解码 Base64', value: 'base64', key:''},
      {label: '加密算法 Hash', value: 'hash', key:''},
      {label: '类型转换 Type', value: 'type', key:''},
      {label: '设备信息 Os', value: 'os', key:''},
    ]},
  ]},

  /* SpringBoot */
  {label:'SpringBoot', value:'java', children:[
    {label:'Java项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装,运行'},
      {label: '打包&发布', value: 'build', key:''},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:''},
      {label: '数据 Data', value: 'data', key:''},
      {label: '日志 Logs', value: 'logs', key:''},
      {label: '验证 Token', value: 'token', key:''},
      {label: '通信 Socket', value: 'socket', key:''},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:''},
      {label: '查询 Select', value: 'select', key:''},
      {label: '插入 Insert', value: 'insert', key:''},
      {label: '更新 Update', value: 'update', key:''},
      {label: '删除 Delete', value: 'delete', key:''},
      {label: '连表 Join', value: 'join', key:''},
      {label: '事务 Commit', value: 'commit', key:''},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:''},
      {label: '导出 Export', value: 'export', key:''},
      {label: '二维码 Qrcode', value: 'qrcode', key:''},
      {label: '缓存 Redis', value: 'redis', key:''},
      {label: '安全验证 Safety', value: 'safety', key:''},
      {label: '通信 WebSocket', value: 'socket', key:''},
      {label: '文件上传 Upload', value: 'upload', key:''},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:''},
      {label: '编码/解码 URL', value: 'url', key:''},
      {label: '编码/解码 Base64', value: 'base64', key:''},
      {label: '加密算法 Hash', value: 'hash', key:''},
      {label: '类型转换 Type', value: 'type', key:''},
      {label: '设备信息 Os', value: 'os', key:''},
      {label: '泛型 Dynamic', value: 'dynamic', key:''},
      {label: '请求响应 Http', value: 'http', key:''},
    ]},
  ]},

  /* Gin */
  {label:'Gin', value:'gin', children:[
    {label:'Gin项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:''},
      {label: '安装&运行', value: 'index', key:''},
      {label: '打包&发布', value: 'build', key:''},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:''},
      {label: '数据 Data', value: 'data', key:''},
      {label: '日志 Logs', value: 'logs', key:''},
      {label: '验证 Token', value: 'token', key:''},
      {label: '通信 Socket', value: 'socket', key:''},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:''},
      {label: '查询 Select', value: 'select', key:''},
      {label: '插入 Insert', value: 'insert', key:''},
      {label: '更新 Update', value: 'update', key:''},
      {label: '删除 Delete', value: 'delete', key:''},
      {label: '连表 Join', value: 'join', key:''},
      {label: '事务 Commit', value: 'commit', key:''},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:''},
      {label: '导出 Export', value: 'export', key:''},
      {label: '二维码 Qrcode', value: 'qrcode', key:''},
      {label: '缓存 Redis', value: 'redis', key:''},
      {label: '安全验证 Safety', value: 'safety', key:''},
      {label: '通信 WebSocket', value: 'socket', key:''},
      {label: '文件上传 Upload', value: 'upload', key:''},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:''},
      {label: '编码/解码 URL', value: 'url', key:''},
      {label: '编码/解码 Base64', value: 'base64', key:''},
      {label: '加密算法 Hash', value: 'hash', key:''},
      {label: '类型转换 Type', value: 'type', key:''},
      {label: '设备信息 Os', value: 'os', key:''},
    ]},
  ]},

  /* Linux */
  {label:'Linux', value:'linux', children:[
    {label:'Linux文档', value:'shell', children:[
      {label: 'Shell基础', value: 'index', key:''},
      {label: 'SSL免费证书', value: 'ssl', key:''},
      {label: 'VBox安装MacOS', value: 'macos', key:''},
      {label: 'Docker 容器', value: 'docker', key:''},
      {label: 'MariaDB 数据库', value: 'mariadb', key:''},
      {label: 'MaxScale 中间件', value: 'maxscale', key:''},
      {label: 'Pulsar 消息列队', value: 'pulsar', key:''},
      {label: 'ElasticSearch 全文搜索', value: 'elasticsearch', key:''},
    ]},
    {label:'Service', value:'service', children:[
      {label: 'Git 服务器搭建', value: 'git', key:''},
    ]},
    {label:'CentOS', value:'centos', children:[
      {label: '基础配置', value: 'config', key:''},
      {label: 'LNMP环境', value: 'lnmp', key:''},
    ]},
    {label:'Ubuntu', value:'ubuntu', children:[
      {label: '基础配置', value: 'config', key:''},
      {label: 'LNMP环境', value: 'lnmp', key:''},
    ]},
    {label:'ArchLinux', value:'archlinux', children:[
      {label: '安装&配置', value: 'install', key:''},
      {label: 'GNOME3桌面', value: 'gnome', key:''},
      {label: 'Nginx+PHP+MariaDB', value: 'lnmp', key:''},
    ]},
  ]},

]