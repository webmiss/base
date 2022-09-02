/* 菜单 */
export default [

  /* Vue */
  {label:'Vue', value:'vue', children:[
    {label:'Vue项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
      {label: '字体图标', value: 'icons', key:'ui,字体图标'},
    ]},
    {label:'App组件', value:'app', children:[
      {label: 'Chart 图表', value: 'chart', key:'chart,图表'},
      {label: 'Loading 动画', value: 'loading', key:'loading,动画'},
      {label: 'PageView 页面容器', value: 'page-view', key:'pageview,页面容器'},
      {label: 'ScrollView 滑动容器', value: 'scroll-view', key:'scrollview,滑动容器'},
      {label: 'Popup 弹出层', value: 'popup', key:'popup,弹出层'},
      {label: 'Picker 选择器', value: 'picker', key:'picker,选择器'},
      {label: 'Swipe 轮播图', value: 'swipe', key:'swipe,轮播图'},
      {label: 'TabBar 导航菜单', value: 'tabbar', key:'tabbar,导航菜单'},
      {label: 'Touch 手势', value: 'touch', key:'touch,手势'},
    ]},
    {label:'Admin组件', value:'admin', children:[
      {label: 'Action 动作图标', value: 'action', key:'action,动作图标'},
      {label: 'Chart 图表', value: 'chart', key:'chart,图表'},
      {label: 'Dialog 对话框', value: 'dialog', key:'dialog,对话框'},
      {label: 'Form 表单', value: 'form', key:'form表单,input输入框,button按钮,checkbox多选,radio单选,select下拉菜单,cascader级联选择器'},
      {label: 'Img 图片', value: 'img', key:'img,图片上传,图片预览'},
      {label: 'Loading 动画', value: 'loading', key:'loading,动画'},
      {label: 'Main 布局', value: 'main', key:'main,布局,容器,row,单行'},
      {label: 'Page 分页', value: 'page', key:'page,分页'},
      {label: 'Popover 弹出框', value: 'popover', key:'popover,弹出框'},
      {label: 'Popup 弹出层', value: 'popup', key:'popup,弹出层'},
      {label: 'ScrollView 滑动层', value: 'scrollview', key:'scrollview,滑动层'},
      {label: 'Search 搜索', value: 'search', key:'search,搜索'},
      {label: 'Switch 开关', value: 'switch', key:'switch,开关'},
      {label: 'Table 表格', value: 'table', key:'table,表格,表单布局'},
      {label: 'Tabs 标签页', value: 'tabs', key:'tabs,标签页'},
      {label: 'Tag 标签', value: 'tag', key:'tag,标签'},
      {label: 'TinyMCE 编辑器', value: 'tinymce', key:'tinymce,html在线编辑器'},
      {label: 'Tree 树形控件', value: 'tree', key:'tree,树形控件'},
      {label: 'Uploader 文件上传', value: 'uploader', key:'uploader,文件上传'},
    ]},
    {label:'Library模块', value:'library', children:[
      {label: 'Ui 界面', value: 'ui', key:'toast,轻提示,back,返回,loading,加载,navigateto,跳转'},
      {label: 'Request 请求', value: 'request', key:'request,请求,get,post,put,patch,delete'},
      {label: 'Storage 本地硬盘', value: 'storage', key:'storage,本地硬盘,setitem,getitem,removeitem,clear'},
      {label: 'Array 数组', value: 'array', key:'array,数组,unique,数组去重复'},
      {label: 'Base64 编码&解码', value: 'base64', key:'base64,编码,解码,类型'},
      {label: 'Device 设备', value: 'device', key:'device,设备,获取手机系统'},
      {label: 'Down 文件下载', value: 'down', key:'down,文件下载,blob下载,downfile,文件下载,导出excel'},
      {label: 'Html 标签', value: 'html', key:'html,标签,加载css和js,htmlobserve,监听容器'},
      {label: 'Price 金额', value: 'price', key:'price,金额,格式化金额,比较增长(百分比),不四舍五入'},
      {label: 'Reg 正则验证', value: 'reg', key:'reg,正则验证,用户名,手机号码,邮箱,验证码,密码'},
      {label: 'Tel 手机号码', value: 'tel', key:'tel,手机号码,拨号,隐藏手机号码'},
      {label: 'Time 时间', value: 'time', key:'time,时间,时间戳(10位),年月日时分秒,时间比较,获取日期,获取星期几,格式化小时,格式化时间'},
      {label: 'URL 编码&解码', value: 'url', key:'url编码,url解码'},
      {label: 'Util 常用工具', value: 'util', key:'util常用工具'},
    ]},
    {label:'Plus模块', value:'plus', children:[
      {label: 'Plus 公共', value: 'plus', key:'plus,公共,plus监听,android返回键,版本比较'},
      {label: 'Camera 相机', value: 'camera', key:'camera,相机'},
      {label: 'Img 图片', value: 'img', key:'img,图片,图片压缩,文件方式,文件对象'},
      {label: 'Map 地图', value: 'map', key:'map,地图,定位信息'},
      {label: 'Notify 本地消息', value: 'notify', key:'notify,本地消息'},
    ]},
  ]},

  /* Flutter */
  {label:'Flutter', value:'flutter', children:[
    {label:'Flutter项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
    ]},
  ]},

  /* PHP */
  {label:'PHP', value:'php', children:[
    {label:'PHP项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:'返回json,get参数,post参数,打印输出到控制台,异常错误'},
      {label: '数据 Data', value: 'data', key:'薄雾算法,雪花算法,图片地址'},
      {label: '日志 Logs', value: 'logs', key:'logs,日志,访问日志,信息日志,操作日志,错误日志,其它日志'},
      {label: '验证 Token', value: 'token', key:'token'},
      {label: '通信 Socket', value: 'socket', key:'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:'orm,model,模型'},
      {label: '查询 Select', value: 'select', key:'orm,select,查询'},
      {label: '插入 Insert', value: 'insert', key:'orm,insert,插入'},
      {label: '更新 Update', value: 'update', key:'orm,update,更新'},
      {label: '删除 Delete', value: 'delete', key:'orm,delete,删除'},
      {label: '连表 Join', value: 'join', key:'orm,join,连表,关联查询'},
      {label: '事务 Commit', value: 'commit', key:'orm,commit,事务,回滚'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:'curl,请求,url参数,request,urlencode,urldecode'},
      {label: '导出 Export', value: 'export', key:'export,导出,excel'},
      {label: '二维码 Qrcode', value: 'qrcode', key:'qrcode,二维码'},
      {label: '缓存 Redis', value: 'redis', key:'redis,缓存'},
      {label: '安全验证 Safety', value: 'safety', key:'safety,安全验证,正则验证,base64加密,base64解密'},
      {label: '通信 WebSocket', value: 'socket', key:'websocket,即时通信'},
      {label: '文件上传 Upload', value: 'upload', key:'upload,文件上传,base64上传,oss签名直传,获取html图片地址'},
      
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:'util,linux命令,len字符串长度,date格式化时间,strtotime日期转时间戳,gmt时间格式,json转换,url参数'},
      {label: '编码/解码 URL', value: 'url', key:'url,urlencode,编码,urldecode,解码'},
      {label: '编码/解码 Base64', value: 'base64', key:'base64,base64_encode,编码,base64_decode,解码,compress,压缩,uncompress,解压,getext,获取后缀'},
      {label: '加密算法 Hash', value: 'hash', key:'hash,加密算法,md5,sha256,hmacsha1,hmacsha256,bytes'},
      {label: '类型转换 Type', value: 'type', key:'type,类型转换,string,int,float'},
      {label: '设备信息 Os', value: 'os', key:'os,设备信息,system,操作系统,browser,浏览器'},
    ]},
  ]},

  /* Flask */
  {label:'Flask', value:'python', children:[
    {label:'Python项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:'返回json,get参数,post参数,打印输出到控制台,异常错误'},
      {label: '数据 Data', value: 'data', key:'薄雾算法,雪花算法,图片地址'},
      {label: '日志 Logs', value: 'logs', key:'logs,日志,访问日志,信息日志,操作日志,错误日志,其它日志'},
      {label: '验证 Token', value: 'token', key:'token'},
      {label: '通信 Socket', value: 'socket', key:'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:'orm,model,模型'},
      {label: '查询 Select', value: 'select', key:'orm,select,查询'},
      {label: '插入 Insert', value: 'insert', key:'orm,insert,插入'},
      {label: '更新 Update', value: 'update', key:'orm,update,更新'},
      {label: '删除 Delete', value: 'delete', key:'orm,delete,删除'},
      {label: '连表 Join', value: 'join', key:'orm,join,连表,关联查询'},
      {label: '事务 Commit', value: 'commit', key:'orm,commit,事务,回滚'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:'curl,请求,url参数,request,urlencode,urldecode'},
      {label: '导出 Export', value: 'export', key:'export,导出,excel'},
      {label: '二维码 Qrcode', value: 'qrcode', key:'qrcode,二维码'},
      {label: '缓存 Redis', value: 'redis', key:'redis,缓存'},
      {label: '安全验证 Safety', value: 'safety', key:'safety,安全验证,正则验证,base64加密,base64解密'},
      {label: '通信 WebSocket', value: 'socket', key:'websocket,即时通信'},
      {label: '文件上传 Upload', value: 'upload', key:'upload,文件上传,base64上传,oss签名直传,获取html图片地址'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:'util,linux命令,len字符串长度,date格式化时间,time时间戳,strtotime日期转时间戳,gmt时间格式,trim去首尾空格,explode拆分字符串为数组,implode数组合成字符串,json转换,arraymerge合并数组,url参数'},
      {label: '编码/解码 URL', value: 'url', key:'url,urlencode,编码,urldecode,解码'},
      {label: '编码/解码 Base64', value: 'base64', key:'base64,base64_encode,编码,base64_decode,解码,compress,压缩,uncompress,解压,getext,获取后缀'},
      {label: '加密算法 Hash', value: 'hash', key:'hash,加密算法,md5,sha256,hmacsha1,hmacsha256,hexencode'},
      {label: '类型转换 Type', value: 'type', key:'type,类型转换,string,int,float'},
      {label: '设备信息 Os', value: 'os', key:'os,设备信息,system,操作系统,browser,浏览器'},
    ]},
  ]},

  /* SpringBoot */
  {label:'SpringBoot', value:'java', children:[
    {label:'Java项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:'返回json,get参数,post参数,打印输出到控制台,异常错误'},
      {label: '数据 Data', value: 'data', key:'薄雾算法,雪花算法,图片地址'},
      {label: '日志 Logs', value: 'logs', key:'logs,日志,访问日志,信息日志,操作日志,错误日志,其它日志'},
      {label: '验证 Token', value: 'token', key:'token'},
      {label: '通信 Socket', value: 'socket', key:'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:'orm,model,模型'},
      {label: '查询 Select', value: 'select', key:'orm,select,查询'},
      {label: '插入 Insert', value: 'insert', key:'orm,insert,插入'},
      {label: '更新 Update', value: 'update', key:'orm,update,更新'},
      {label: '删除 Delete', value: 'delete', key:'orm,delete,删除'},
      {label: '连表 Join', value: 'join', key:'orm,join,连表,关联查询'},
      {label: '事务 Commit', value: 'commit', key:'orm,commit,事务,回滚'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:'curl,请求,url参数,request,urlencode,urldecode'},
      {label: '导出 Export', value: 'export', key:'export,导出,excel'},
      {label: '二维码 Qrcode', value: 'qrcode', key:'qrcode,二维码'},
      {label: '缓存 Redis', value: 'redis', key:'redis,缓存'},
      {label: '安全验证 Safety', value: 'safety', key:'safety,安全验证,正则验证,base64加密,base64解密'},
      {label: '通信 WebSocket', value: 'socket', key:'websocket,即时通信'},
      {label: '文件上传 Upload', value: 'upload', key:'upload,文件上传,base64上传,oss签名直传,获取html图片地址'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:'util,linux命令,len字符串长度,date格式化时间,time时间戳,strtotime日期转时间戳,gmt时间格式,trim去首尾空格,explode拆分字符串为数组,implode数组合成字符串,json转换,arraymerge合并数组'},
      {label: '编码/解码 URL', value: 'url', key:'url,urlencode,编码,urldecode,解码'},
      {label: '编码/解码 Base64', value: 'base64', key:'base64,base64_encode,编码,base64_decode,解码,compress,压缩,uncompress,解压,getext,获取后缀'},
      {label: '加密算法 Hash', value: 'hash', key:'hash,加密算法,md5,sha256,hmacsha1,hmacsha256,hexencode,strtobyte'},
      {label: '类型转换 Type', value: 'type', key:'type,类型转换,string,int,float'},
      {label: '设备信息 Os', value: 'os', key:'os,设备信息,system,操作系统,browser,浏览器'},
      {label: '泛型 Dynamic', value: 'dynamic', key:'dynamic,泛型'},
      {label: '请求响应 Http', value: 'http', key:'http,请求响应'},
    ]},
  ]},

  /* Gin */
  {label:'Gin', value:'gin', children:[
    {label:'Gin项目', value:'install', children:[
      {label: '开发环境', value: 'install', key:'开发环境'},
      {label: '安装&运行', value: 'index', key:'安装&运行'},
      {label: '打包&发布', value: 'build', key:'打包&发布'},
    ]},
    {label:'Service 服务', value:'service', children:[
      {label: '基础 Base', value: 'base', key:'返回json,get参数,post参数,打印输出到控制台,异常错误'},
      {label: '数据 Data', value: 'data', key:'薄雾算法,雪花算法,图片地址'},
      {label: '日志 Logs', value: 'logs', key:'logs,日志,访问日志,信息日志,操作日志,错误日志,其它日志'},
      {label: '验证 Token', value: 'token', key:'token'},
      {label: '通信 Socket', value: 'socket', key:'socket'},
    ]},
    {label:'ORM 数据库', value:'db', children:[
      {label: '模型 Model', value: 'model', key:'orm,model,模型'},
      {label: '查询 Select', value: 'select', key:'orm,select,查询'},
      {label: '插入 Insert', value: 'insert', key:'orm,insert,插入'},
      {label: '更新 Update', value: 'update', key:'orm,update,更新'},
      {label: '删除 Delete', value: 'delete', key:'orm,delete,删除'},
      {label: '连表 Join', value: 'join', key:'orm,join,连表,关联查询'},
      {label: '事务 Commit', value: 'commit', key:'orm,commit,事务,回滚'},
    ]},
    {label:'Library 类库', value:'library', children:[
      {label: '请求 Curl', value: 'curl', key:'curl,请求,url参数,request,urlencode,urldecode'},
      {label: '导出 Export', value: 'export', key:'export,导出,excel'},
      {label: '二维码 Qrcode', value: 'qrcode', key:'qrcode,二维码'},
      {label: '缓存 Redis', value: 'redis', key:'redis,缓存'},
      {label: '安全验证 Safety', value: 'safety', key:'safety,安全验证,正则验证,base64加密,base64解密'},
      {label: '通信 WebSocket', value: 'socket', key:'websocket,即时通信'},
      {label: '文件上传 Upload', value: 'upload', key:'upload,文件上传,base64上传,oss签名直传,获取html图片地址'},
    ]},
    {label:'Util 工具', value:'util', children:[
      {label: '常用工具', value: 'util', key:'util,linux命令,len字符串长度,empty是否为空,in_key是否存在KEY,in_array是否存在于数组,三元表达式,date格式化时间,time时间戳,strtotime日期转时间戳,gmt时间格式,trim去首尾空格,explode拆分字符串为数组,implode数组合成字符串,json转换,arraymerge合并数组,url参数,截取小数位数'},
      {label: '编码/解码 URL', value: 'url', key:'url,urlencode,编码,urldecode,解码'},
      {label: '编码/解码 Base64', value: 'base64', key:'base64,base64_encode,编码,base64_decode,解码,compress,压缩,uncompress,解压,getext,获取后缀'},
      {label: '加密算法 Hash', value: 'hash', key:'hash,加密算法,md5,sha256,hmacsha1,hmacsha256,hexencode'},
      {label: '类型转换 Type', value: 'type', key:'type,类型转换,bool,int,int64,float,float64,uint64'},
      {label: '设备信息 Os', value: 'os', key:'os,设备信息,system,操作系统,browser,浏览器'},
    ]},
  ]},

  /* Linux */
  {label:'Linux', value:'linux', children:[
    {label:'Linux文档', value:'shell', children:[
      {label: 'Shell基础', value: 'index', key:'shell基础'},
      {label: 'SSL免费证书', value: 'ssl', key:'ssl免费证书'},
      {label: 'VBox安装MacOS', value: 'macos', key:'virtualbox安装macos'},
      {label: 'Docker 容器', value: 'docker', key:'docker容器'},
      {label: 'MariaDB 数据库', value: 'mariadb', key:'mariadb数据库'},
      {label: 'MaxScale 中间件', value: 'maxscale', key:'maxscale中间件'},
      {label: 'Pulsar 消息列队', value: 'pulsar', key:'pulsar消息列队'},
      {label: 'PyQt5 图形界面编程', value: 'pyqt', key:'pyqt5图形界面编程'},
      {label: 'ElasticSearch 全文搜索', value: 'elasticsearch', key:'elasticsearch全文搜索'},
    ]},
    {label:'Service', value:'service', children:[
      {label: 'Git 服务器', value: 'git', key:'git服务器搭建'},
      {label: 'VPN 服务器', value: 'vpn', key:'pn服务器'},
    ]},
    {label:'CentOS', value:'centos', children:[
      {label: '基础配置', value: 'config', key:'centos基础配置'},
      {label: 'LNMP环境', value: 'lnmp', key:'lnmp环境'},
    ]},
    {label:'Ubuntu', value:'ubuntu', children:[
      {label: '基础配置', value: 'config', key:'ubuntu基础配置'},
      {label: 'LNMP环境', value: 'lnmp', key:'lnmp环境'},
    ]},
    {label:'ArchLinux', value:'archlinux', children:[
      {label: '安装&配置', value: 'install', key:'archLinux安装&配置'},
      {label: 'GNOME3桌面', value: 'gnome', key:'gnome3桌面'},
      {label: 'Nginx+PHP+MariaDB', value: 'lnmp', key:'lnmp环境'},
      {label: 'Github SSH方式', value: 'github', key:'github,ssh方式'},
    ]},
  ]},

]