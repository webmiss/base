# Phalcon开发环境

## ArchLinux
#### 1) 安装Git
```bash
pacman -S git
```

#### 2) 安装PHP7
```bash
pacman -S php php-fpm php-gd
# 查看
php -v
# 安装Composer
pacman -S composer
# 国内镜像
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

#### 3) 安装MariaDB
```bash
pacman -S mariadb
# 启动
systemctl start mysqld
```

#### 4) 安装Redis
```bash
pacman -S redis php-redis
# 启动
systemctl start redis
```

#### 5) Phalcon框架
```bash
pacman -S yay
yay -S php-phalcon
```

<br/>

## Windows
#### 1) 安装Git
- 下载 [Git](https://git-scm.com/download/win)
- 安装: 64位版 > 重启系统
- VsCode: "ctrl+`" > "终端" > "powershell" > "选择默认 shell" > "Git Bash" > 重启
- 终端输入: "cmd" 和 "bash" 可相互切换

#### 2) 安装PHP7
- [PHP7.4](https://windows.php.net/download#php-7.4)
- 解压: "php-7.4.13-nts-Win32-vc15-x64.zip" 到 "D:\server\php"
- 搜索: "环境变量" > "Path" > "添加" > "D:\server\php"
- 配置: "D:\server\php\php.ini" , 如果没有复制"php.ini-development"或"php.ini-production"
- 扩展目录: extension_dir = "D:/server/php/ext"
- CMD: php -v
**安装Composer**
- [Composer](https://getcomposer.org/Composer-Setup.exe)

### 3) 安装MariaDB
- [MariaDB](https://downloads.mariadb.org/)
- 安装: "mariadb-10.5.9-winx64.msi" 到 "D:\server\MariaDB"
- 搜索: "环境变量" > "Path" > "添加" > "D:\server\MariaDB\bin"
- 扩展: "extension=mysqli" 和 "extension=pdo_mysql"
- CMD: php -m
- PHP数据库工具: [Adminer](https://github.com/vrana/adminer/releases/)

#### 4) 安装Redis
- [Redis](https://github.com/MicrosoftArchive/redis/releases) 、[php-redis](http://pecl.php.net/package/redis/5.3.2/windows)
- 解压: "Redis-x64-3.2.100.zip" 到 "D:\server\redis"
- 搜索: "环境变量" > "Path" > "添加" > "D:\server\redis"
- 启动: "redis-server"
- 解压: "php_redis.dll" 到 "D:\server\php\ext"
- 扩展: "extension=redis"
- CMD: php -m

#### 5) Phalcon框架
- [Phalcon4](https://windows.php.net/download#php-7.4) 、[php-psr](https://pecl.php.net/package/psr/1.0.1/windows)
- 解压: "php_phalcon.dll" 到 "D:\server\php\ext"
- 解压: "php_psr.dll" 到 "D:\server\php\ext"
- 扩展: "extension=psr" 和 "extension=phalcon"
- CMD: php -m

<br/>

## MacOS
#### 1) 安装Git
```bash
git
```

#### 2) 安装PHP7
```bash
php
# 查看
php -v
# 安装Composer
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
```

#### 3) 安装MacPorts
- 下载: [MacPorts](https://www.macports.org/install.php)
- 查看: "port version"
**环境变量**( sudo vi /etc/profile )
```bash
export PATH=/opt/local/bin:$PATH
export PATH=/opt/local/sbin:$PATH
```
**清华镜像源**( sudo vi /opt/local/etc/macports/macports.conf )
```bash
rsync_server        mirrors.tuna.tsinghua.edu.cn
rsync_dir           macports/release/base/
```
**sudo vi /opt/local/etc/macports/sources.conf**
```bash
rsync://mirrors.tuna.tsinghua.edu.cn/macports/release/ports/ [default]
```
**刷新**
```bash
sudo port -v sync
sudo port -v selfupdate
```

#### 4) Phalcon框架
```bash
sudo port install php73-phalcon4
```

<br/><br/>