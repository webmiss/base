# VirtualBox-安装MacOS

#### > [下载ISO文件](https://sysin.org/article/Download-VMware-macOS-Catalina-iso/)

<br/>

### 一、创建虚拟机
#### 新建
- 名称: Catalina
- 类型: Mac OS X
- 版本: Mac OS X（64位）
#### 内存
- 大小: 4096
#### 硬盘
- 现在创建硬盘
#### 文件类型
- VDI
#### 存储方式
- 固定大小
#### 大小( 安装XCode、自动更新 )
- 80.00 GB

<br/>

## 二、配置虚拟机
#### 系统
- 主板: 去除“软驱”
- 处理器: 2
#### 显示
- 显存大小: 128 MB
#### 存储
- 选择Catalina.iso，然后“确定”

## 三、模拟环境
```bash
# MacBookPro
VBoxManage modifyvm "MacOS" --cpuidset 00000001 000306a9 04100800 7fbae3ff bfebfbff
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "MacBookPro11,3"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-2BD1B31983FE1663"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
# iMac
VBoxManage modifyvm "MacOS" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff 
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3" 
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0" 
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple" 
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc" 
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```
- windows用户cd到VBox安装目录或配置系统环境变量

<br/>

## 四、安装系统
- 语言: 简体中文
- 磁盘工具: "VBOX HARDDISK Media" > APFS(必须文件格式) > 抹掉 > 关闭
- 重新安装macOS > 继续 > 同意条款
- 选择硬盘 > 安装 > 配置
- 设置 > 硬盘 > Catalina.iso > 从虚拟驱动器中删除磁盘
- 如果正常重启后看到登录界面

<br/>

## 五、设置分辨率( 尝试失败! )
```bash
# 查看
VBoxManage getextradata "MacOS" VBoxInternal2/EfiGraphicsResolution
# 设置
VBoxManage setextradata "MacOS" "VBoxInternal2/EfiGopMode" 4
VBoxManage setextradata "MacOS" VBoxInternal2/EfiGraphicsResolution 1920*1080
VBoxManage setextradata "MacOS" VBoxInternal2/EfiGraphicsResolution HxV
```
- 1 800×600
- 2 1024×768
- 3 1280×1024
- 4 1440×900
- 5 1920×1200

<br/><br/>