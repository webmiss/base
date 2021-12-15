# GNOME3桌面

## 安装
``` bash
# 桌面环境
pacman -S gnome
# 登陆管理器
systemctl enable gdm
```
- 如果是VBox虚拟机需安装“virtualbox-guest-utils”

<br/>

#### 1) 创建桌面用户
``` bash
useradd -m webmis
passwd webmis
```

#### 2) 安装字体
``` bash
pacman -S wqy-zenhei wqy-microhei
```

#### 3) 配置网络管理
``` bash
pacman -S networkmanager
# NetworkManager添加vpn拨号
pacman -S networkmanager-pptp

# 开机启动
systemctl disable dhcpcd
systemctl enable NetworkManager

# 重启
reboot
```
<br/>

## 键盘快捷键
- 系统配置->键盘->自定义快捷键->添加
- 终端( gnome-terminal )

<br/>

## 输入法
``` bash
pacman -S ibus ibus-libpinyin
```
- 注:然后到“系统设置->区域和语言->输入源”,添加 中文(智能拼音) 后注销并重新登录!

<br/>

## 美化桌面
``` bash
# 优化工具
pacman -S gnome-tweaks
```
- 安装: 软件 > 实用工具 > 扩展
- 下载: [Shell主题](https://github.com/webmiss/gnome-shell)
- 字体: 优化工具 > 字体 > "文泉驿微米黑"
- Shell主题: 优化工具 > 扩展 > User themes
- 

<br/>

## 常用软件
#### 1) 浏览器
``` bash
# Chrome 开源版
pacman -S chromium
# 视频解码
pacman -S gst-libav
```

#### 2) 软件仓库
``` bash
# 编辑
vi /etc/pacman.conf
	[archlinuxcn]
	SigLevel = Optional TrustAll
	Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
# 安装
pacman -Syu yay
# 编译环境
pacman -S linux-headers dkms fakeroot
# 密钥
pacman -S archlinux-keyring archlinuxcn-keyring
```

#### 3) 扩展VI和文本编辑器
``` bash
pacman -S vim gedit
```

#### 4) WEB开发工具
``` bash
# 安装
yaourt -S sublime-text-dev
# 启动方式
vi /usr/bin/sublime
	#!/bin/sh
	export SUBLIME_HOME="/opt/sublime_text_3"
	$SUBLIME_HOME/sublime_text "$*"
# 权限
chmod -R 777 /usr/bin/sublime
```

#### 5) VirtualBox虚拟机
``` bash
# 安装
pacman -S virtualbox virtualbox-host-dkms virtualbox-guest-iso
# 升级内核无法启动虚拟机
modprobe -a vboxnetadp vboxnetflt vboxdrv
```

#### 6) 其它工具
``` bash
# SVN版本控制
pacman -S subversion

# 多线程下载工具
pacman -S axel

# SSH工具箱 (包括 ssh, scp)
pacman -S openssh

# 远程桌面工具
pacman -S freerdp remmina
pacman -S vinagre
# 禁用Vino加密
gsettings set org.gnome.Vino require-encryption false

# 解压软件
pacman -S p7zip file-roller unrar

# 文件系统
pacman -S ntfs-3g dosfstools

# 无线AP
pacman -S create_ap
```

<br/><br/>