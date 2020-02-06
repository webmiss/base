
import Env from '@/env'

/* 函数 */
const install = (Vue)=>{
  // 系统标题
  document.title = Env.title;
  // 配置信息
  Vue.prototype.$config = Env;
  // 全局变量
  Vue.prototype.$obj = {
    showMenu: true,
    scan: null,
    setTime: null,
    socket: null,
  };
  /* 正则验证 */
  Vue.prototype.$reg = (name,val)=>{
    let isRight=false;
    let msg='';
    const reg = {
      uname: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/,
      tel: /^[1]\d{10}$/,
      email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      vcode: /^\d{4}$/,
      passwd: /^\w{6,16}$/,
    }
    switch(name){
      case 'uname':
        isRight = reg.uname.test(val);
        msg = !isRight?'用户名英文开头5~16位！':'';
        break;
      case 'tel':
        isRight = reg.tel.test(val);
        msg = !isRight?'手机号码错误！':'';
        break;
      case 'email':
        isRight = reg.email.test(val);
        msg = !isRight?'邮箱帐号错误！':'';
        break;
      case 'vcode':
        isRight = reg.vcode.test(val);
        msg = !isRight?'验证码4位！':'';
        break;
      case 'passwd':
        isRight = reg.passwd.test(val);
        msg = !isRight?'密码为6~16位字符！':'';
        break;
    }
    return isRight?true:msg;
  }
  /* 菜单管理 */
  Vue.prototype.$menus = [
    // 首页
    {title:'开发文档',menus:[
      {title: '使用说明',content: require('./docs/index.md'), menus:[]},
      {title: '开发工具', menus:[
        {title: '异步网络通信(Swoole)',content: require('./docs/mvc/libray/swoole.md'), menus:[]},
        {title: '套接字(Socket)',content: require('./docs/mvc/libray/socket.md'), menus:[]},
        {title: 'Html5流媒体(Segments)',content: require('./docs/mvc/libray/segments.md'), menus:[]},
        {title: '图片识别(Tesseract)',content: require('./docs/mvc/libray/tesseract.md'), menus:[]},
        {title: '苹果上架(AppStore)',content: require('./docs/mvc/libray/appstore.md'), menus:[]},
      ]},
      {title: 'PHP', menus:[
        {title: 'Composer创建项目',content: require('./docs/mvc/php/composer.md'), menus:[]},
      ]},
      {title: 'NodeJS', menus:[
        {title: 'Vue创建项目',content: require('./docs/mvc/node/vue.md'), menus:[]},
      ]},
      {title: 'APP', menus:[
        {title: 'Vue创建项目',content: require('./docs/mvc/app/flutter.md'), menus:[]},
      ]},
      {title: 'C/C++', menus:[
        {title: 'VSCode',content: require('./docs/mvc/cpp/vscode.md'), menus:[]},
        {title: 'PHP调用',content: require('./docs/mvc/cpp/auto.md'), menus:[]},
      ]},
      {title: 'Python', menus:[
        {title: '环境搭配',content: require('./docs/mvc/python/install.md'), menus:[]},
        {title: 'Flask-MVC',content: require('./docs/mvc/python/flask.md'), menus:[]},
      ]},
      {title: 'Java', menus:[
        {title: '环境搭配',content: require('./docs/mvc/java/install.md'), menus:[]},
        {title: 'SpringBoot',content: require('./docs/mvc/java/springboot.md'), menus:[]},
      ]},
      {title: 'Flutter', menus:[
        {title: '环境搭配',content: require('./docs/mvc/app/flutter.md'), menus:[]},
      ]},
    ]},
    // Linux文档
    {title:'Linux文档',menus:[
      {title: 'Shell', menus:[
        {title: '基础语法',content: require('./docs/linux/shell/index.md'), menus:[]},
        {title: '常用工具',content: require('./docs/linux/shell/tools.md'), menus:[]},
        {title: 'MariaDB数据库',content: require('./docs/linux/shell/mysql.md'), menus:[]},
        {title: 'Docker容器',content: require('./docs/linux/shell/docker.md'), menus:[]},
        {title: 'Nginx负载均衡',content: require('./docs/linux/shell/nginx.md'), menus:[]},
        {title: 'Redis消息列队',content: require('./docs/linux/shell/redis.md'), menus:[]},
      ]},
      {title: 'Server', menus:[
        {title: 'SSL免费证书',content: require('./docs/linux/server/ssl.md'), menus:[]},
        {title: 'FTP服务器(虚拟用户)',content: require('./docs/linux/server/ftp.md'), menus:[]},
        {title: 'SVN服务器',content: require('./docs/linux/server/svn.md'), menus:[]},
        {title: 'GIT服务器',content: require('./docs/linux/server/git.md'), menus:[]},
        {title: 'VPN服务器',content: require('./docs/linux/server/vpn.md'), menus:[]},
        {title: 'DHCP服务器',content: require('./docs/linux/server/dhcp.md'), menus:[]},
        {title: 'PPPOE服务器',content: require('./docs/linux/server/pppoe.md'), menus:[]},
      ]},
      {title: 'CentOS', menus:[
        {title: '基础配置',content: require('./docs/linux/centos/index.md'), menus:[]},
        {title: '防火墙',content: require('./docs/linux/centos/firewall.md'), menus:[]},
        {title: 'Nginx+PHP+Mariadb',content: require('./docs/linux/centos/nginx.md'), menus:[]},
        {title: 'Sendmail发邮件',content: require('./docs/linux/centos/sendmail.md'), menus:[]},
      ]},
      {title: 'Ubuntu', menus:[
        {title: '基础配置',content: require('./docs/linux/ubuntu/index.md'), menus:[]},
        {title: '防火墙',content: require('./docs/linux/ubuntu/firewall.md'), menus:[]},
      ]},
      {title: 'ArchLinux', menus:[
        {title: '基础配置',content: require('./docs/linux/archlinux/index.md'), menus:[]},
        {title: '安装 & Windows 双系统',content: require('./docs/linux/archlinux/install.md'), menus:[]},
        {title: '桌面和常用软件',content: require('./docs/linux/archlinux/gnome.md'), menus:[]},
        {title: 'Nginx+PHP+Mariadb',content: require('./docs/linux/archlinux/nginx.md'), menus:[]},
        {title: 'Sublime3+Gnome3中文输入',content: require('./docs/linux/archlinux/sublime.md'), menus:[]},
        {title: 'Cordova安装配置',content: require('./docs/linux/archlinux/cordova.md'), menus:[]},
      ]},
    ]},
  ];
}
export default install;