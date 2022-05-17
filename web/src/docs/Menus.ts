/* 菜单 */
export default [

  /* Vue */
  {label:'Vue', value:'vue', children:[
    {label:'Vue项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
    {label:'App组件', value:'app', children:[
      {label: 'Chart 图表', value: 'chart'},
      {label: 'Loading 动画', value: 'loading'},
      {label: 'PageView 页面容器', value: 'page-view'},
      {label: 'ScrollView 滑动容器', value: 'scroll-view'},
      {label: 'Popup 弹出层', value: 'popup'},
      {label: 'Picker 选择器', value: 'picker'},
      {label: 'Swipe 轮播图', value: 'swipe'},
      {label: 'TabBar 导航菜单', value: 'tabbar'},
      {label: 'Touch 手势', value: 'touch'},
    ]},
    {label:'Admin组件', value:'admin', children:[
      {label: 'Action 动作菜单', value: 'action'},
      {label: 'Dialog 对话框', value: 'dialog'},
      {label: 'Form 表单', value: 'form'},
      {label: 'Img 图片', value: 'img'},
      {label: 'Loading 动画', value: 'loading'},
      {label: 'Main 布局', value: 'main'},
      {label: 'Page 分页', value: 'page'},
      {label: 'Popup 弹出层', value: 'popup'},
      {label: 'Popover 弹出框', value: 'popover'},
      {label: 'ScrollView 滑动层', value: 'scrollview'},
      {label: 'Switch 开关', value: 'switch'},
      {label: 'Table 表格', value: 'table'},
      {label: 'Tag 标签', value: 'tag'},
      {label: 'TinyMCE 编辑器', value: 'tinymce'},
      {label: 'Tree 树形控件', value: 'tree'},
      {label: 'Uploader 上传', value: 'uploader'},
    ]},
    {label:'Library模块', value:'library', children:[
      {label: 'Ui 界面', value: 'ui'},
      {label: 'Request 请求', value: 'request'},
      {label: 'Storage 本地硬盘', value: 'storage'},
      {label: 'Array 数组', value: 'array'},
      {label: 'Base64 编码&解码', value: 'base64'},
      {label: 'Device 设备', value: 'device'},
      {label: 'Down 文件下载', value: 'down'},
      {label: 'Html 标签', value: 'html'},
      {label: 'Price 金额', value: 'price'},
      {label: 'Reg 正则验证', value: 'reg'},
      {label: 'Tel 手机号码', value: 'tel'},
      {label: 'Time 时间', value: 'time'},
      {label: 'URL 编码&解码', value: 'url'},
    ]},
    {label:'Plus模块', value:'plus', children:[
      {label: 'Plus 公共', value: 'plus'},
      {label: 'Camera 相机', value: 'camera'},
      {label: 'Img 图片', value: 'img'},
      {label: 'Map 地图', value: 'map'},
      {label: 'Notify 本地消息', value: 'notify'},
    ]},
  ]},

  /* Flutter */
  {label:'Flutter', value:'flutter', children:[
    {label:'Flutter项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
  ]},

  /* Phalcon */
  {label:'Phalcon', value:'phalcon', children:[
    {label:'Phalcon项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base'},
      {label: '数据 Data', value: 'data'},
      {label: '日志 Logs', value: 'logs'},
      {label: '验证 Token', value: 'token'},
      {label: '通信 Socket', value: 'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model'},
      {label: '查询 Select', value: 'select'},
      {label: '插入 Insert', value: 'insert'},
      {label: '更新 Update', value: 'update'},
      {label: '删除 Delete', value: 'delete'},
      {label: '连表 Join', value: 'join'},
      {label: '事务 Commit', value: 'commit'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '缓存 Redis', value: 'redis'},
      {label: '通信 WebSocket', value: 'socket'},
      {label: '安全验证 Safety', value: 'safety'},
      {label: '文件上传 Upload', value: 'upload'},
      {label: '二维码 Qrcode', value: 'qrcode'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util'},
      {label: '编码/解码 URL', value: 'url'},
      {label: '编码/解码 Base64', value: 'base64'},
      {label: '加密算法 Hash', value: 'hash'},
      {label: '类型转换 Type', value: 'type'},
      {label: '设备信息 Os', value: 'os'},
    ]},
  ]},

  /* Python */
  {label:'Python', value:'python', children:[
    {label:'Python项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base'},
      {label: '数据 Data', value: 'data'},
      {label: '日志 Logs', value: 'logs'},
      {label: '验证 Token', value: 'token'},
      {label: '通信 Socket', value: 'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model'},
      {label: '查询 Select', value: 'select'},
      {label: '插入 Insert', value: 'insert'},
      {label: '更新 Update', value: 'update'},
      {label: '删除 Delete', value: 'delete'},
      {label: '连表 Join', value: 'join'},
      {label: '事务 Commit', value: 'commit'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '缓存 Redis', value: 'redis'},
      {label: '通信 WebSocket', value: 'socket'},
      {label: '安全验证 Safety', value: 'safety'},
      {label: '文件上传 Upload', value: 'upload'},
      {label: '二维码 Qrcode', value: 'qrcode'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util'},
      {label: '编码/解码 URL', value: 'url'},
      {label: '编码/解码 Base64', value: 'base64'},
      {label: '加密算法 Hash', value: 'hash'},
      {label: '类型转换 Type', value: 'type'},
      {label: '设备信息 Os', value: 'os'},
    ]},
  ]},

  /* SpringBoot */
  {label:'SpringBoot', value:'java', children:[
    {label:'Java项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base'},
      {label: '数据 Data', value: 'data'},
      {label: '日志 Logs', value: 'logs'},
      {label: '验证 Token', value: 'token'},
      {label: '通信 Socket', value: 'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model'},
      {label: '查询 Select', value: 'select'},
      {label: '插入 Insert', value: 'insert'},
      {label: '更新 Update', value: 'update'},
      {label: '删除 Delete', value: 'delete'},
      {label: '连表 Join', value: 'join'},
      {label: '事务 Commit', value: 'commit'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '缓存 Redis', value: 'redis'},
      {label: '通信 WebSocket', value: 'socket'},
      {label: '安全验证 Safety', value: 'safety'},
      {label: '文件上传 Upload', value: 'upload'},
      {label: '二维码 Qrcode', value: 'qrcode'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util'},
      {label: '编码/解码 URL', value: 'url'},
      {label: '编码/解码 Base64', value: 'base64'},
      {label: '加密算法 Hash', value: 'hash'},
      {label: '类型转换 Type', value: 'type'},
      {label: '设备信息 Os', value: 'os'},
      {label: '泛型 Dynamic', value: 'dynamic'},
      {label: '请求响应 Http', value: 'http'},
    ]},
  ]},

  /* Gin */
  {label:'Gin', value:'gin', children:[
    {label:'Gin项目', value:'install', children:[
      {label: '开发环境', value: 'install'},
      {label: '安装&运行', value: 'index'},
      {label: '打包&发布', value: 'build'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base'},
      {label: '数据 Data', value: 'data'},
      {label: '日志 Logs', value: 'logs'},
      {label: '验证 Token', value: 'token'},
      {label: '通信 Socket', value: 'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model'},
      {label: '查询 Select', value: 'select'},
      {label: '插入 Insert', value: 'insert'},
      {label: '更新 Update', value: 'update'},
      {label: '删除 Delete', value: 'delete'},
      {label: '连表 Join', value: 'join'},
      {label: '事务 Commit', value: 'commit'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '缓存 Redis', value: 'redis'},
      {label: '通信 WebSocket', value: 'socket'},
      {label: '安全验证 Safety', value: 'safety'},
      {label: '文件上传 Upload', value: 'upload'},
      {label: '二维码 Qrcode', value: 'qrcode'},
      {label: '事件流 Kafka', value: 'kafka'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util'},
      {label: '编码/解码 URL', value: 'url'},
      {label: '编码/解码 Base64', value: 'base64'},
      {label: '加密算法 Hash', value: 'hash'},
      {label: '类型转换 Type', value: 'type'},
      {label: '设备信息 Os', value: 'os'},
    ]},
  ]},

  /* Linux */
  {label:'Linux', value:'linux', children:[
    {label:'Linux文档', value:'shell', children:[
      {label: 'Shell基础', value: 'index'},
      {label: 'SSL免费证书', value: 'ssl'},
      {label: 'VBox安装MacOS', value: 'macos'},
      {label: 'Docker 容器', value: 'docker'},
      {label: 'MariaDB 数据库', value: 'mariadb'},
      {label: 'MaxScale 中间件', value: 'maxscale'},
      {label: 'Pulsar 消息列队', value: 'pulsar'},
      {label: 'ElasticSearch 全文搜索', value: 'elasticsearch'},
    ]},
    {label:'Service', value:'service', children:[
      {label: 'FTP 文件传输', value: 'ftp'},
    ]},
    {label:'CentOS', value:'centos', children:[
      {label: '基础配置', value: 'config'},
      {label: 'LNMP环境', value: 'lnmp'},
    ]},
    {label:'Ubuntu', value:'ubuntu', children:[
      {label: '基础配置', value: 'config'},
      {label: 'LNMP环境', value: 'lnmp'},
    ]},
    {label:'ArchLinux', value:'archlinux', children:[
      {label: '安装&配置', value: 'install'},
      {label: 'GNOME3桌面', value: 'gnome'},
      {label: 'Nginx+PHP+MariaDB', value: 'lnmp'},
    ]},
  ]},

]