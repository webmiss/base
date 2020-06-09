
## WebMIS
基于Phalcon全套前端分离开发方案，包括MVC框架、后台管理、Web、WebAPP、Flutter、微信小程序、API接口工具等，整套框架只封装基础功能，对于使用者还需具备扎实的计算机编程基础和设计模式。

## 一、下载
``` bash
git clone https://github.com/webmiss/base
```

## 二、配置
- 数据中心-API( [phalcon_data/app/config/env.php](/docs/webmis/install/config) )
- 数据中心-后台( [admin_data/src/env.js](/docs/webmis/install/config) )
- 基础框架-API( [phalcon/app/config/env.php](/docs/webmis/install/config) )
- 基础框架-后台( [admin/src/env.js](/docs/webmis/install/config) )
- 混合型APP( [vueapp/src/env.js](/docs/webmis/install/config) )
- 微信小程序( [weapp/env.js](/docs/webmis/install/config) )
- 支付宝小程序( [aliapp/env.js](/docs/webmis/install/config) )

注意：数据库、设计图、字体图标等相关文件project目录下

## 三、运行
```bash
# 进入目录
cd admin_data
# 安装依赖包
yarn install
# 运行
yarn serve
```

管理员账号: admin 密码:123456
