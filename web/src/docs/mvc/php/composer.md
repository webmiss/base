## 一、Github创建项目克隆
``` bash
git clone https://github.com/webmiss/framework
```

## 二、Composer创建项目
``` bash
# 项目目录
cd framework
# 配置向导
composer init
```
- Package name (<vendor>/<name>) [kingsoul/framework]: webmiss/framework
- Description []: The Webmis Framework
- Author [webmiss <klingsoul@163.com>, n to skip]: 
- Minimum Stability []: dev
- Package Type (e.g. library, project, metapackage, composer-plugin) []: library
- License []: MIT

### composer.json
``` json
{
    "name": "webmiss/framework",
    "description": "The Webmis Framework",
    "type": "library",
    "license": "MIT",
    "authors": [
        {
            "name": "webmis",
            "email": "klingsoul@163.com"
        }
    ],
    "minimum-stability": "dev",
    "require": {
        "php": "^5.4 || ^7.0"
    },
    "autoload": {
        "psr-4": {
            "Webmis\\": "src/"
        }
    }
}
```
### 安装项目
``` bash
composer install
```
### 排除内容（.gitignore）
``` bash
/vendor
composer.lock
```

## 三、Packagist
- 首先要在Packagist上注册账号并登录
- 点击顶部导航条中的Summit按钮
- 在输入框中输入github上的仓库地址，如：https://github.com/webmiss/framework
- 然后点击Check按钮
- 检测正常的话，会出现Submit按钮，再点击一下Submit按钮，我们的包就提交到Packagist上了
- 以后更新代码可以先从Packagist获取token然后去github 配置下对应的GitHub Service Hook实现代码提交后Packagist自动拉取更新

## 四、使用
``` bash
composer require webmiss/framework
```
或者（composer.json）
``` bash
{
    "require": {
        "webmiss/framework":"dev-master" //这里的版本根据实际需要修改
    }
}
```
### 优化自动加载
``` bash
composer dump-autoload --optimize
```