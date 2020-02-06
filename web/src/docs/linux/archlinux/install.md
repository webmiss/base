## EFI启动模式
``` bash
1) 电脑启动模式设置成“UEFI Mode”
2) 禁用安全启动(Secure Boot)
```

## 安装win10
```选择“自定义安装”创建C盘为50GB，系统会自动创建128MB引导分区```

## 安装Archlinux
``` bash
# 1) 下载ISO文件：https://www.archlinux.org/download/
# 2) Linux下用DD命令制作U盘启动盘(win下直接拷贝ISO里的文件）
dd if=xxx.iso of=/dev/sdb bs=1M && sync
# 恢复U盘容量
dd if=/dev/zero of=/dev/sdb bs=1M count=1
# 3) 打开loader\entries\archiso-x86_64.conf
# 将ARCH_201603换成U盘分区的卷名(分区名)
```

### GPT分区
``` bash
parted /dev/sda

# 建立GPT分区表(MBR msdos)
mklabel gpt

# 建立ESP分区
mkpart primary 2048s  512M

# 标志为boot
set 1 boot on

# 退出
q
```

### linux分区(MBR : cfdisk、fdisk; GPT : fdisk)
``` bash
fdisk -l
```
设备 起点 末尾 扇区 大小 类型<br>
/dev/sda1 2048 1050623 1048576 100M EFI 系统<br>
/dev/sda2 609230848 609640447 409600 200M Linux /boot<br>
/dev/sda3 609640448 618029055 8388608 4G Linux swap<br>
/dev/sda4 618029056 659972095 41943040 20G Linux /<br>
/dev/sda5 659972096 976773134 316801039 151.1G Linux /home<br>

### 格式化分区(注意根据自己的事实分区操作)
``` bash
# 格式化
mkfs -t ext4 /dev/sda2
mkfs -t ext4 /dev/sda4
mkfs -t ext4 /dev/sda5

# 如果是自己创建的EFI分区
mkfs -t vfat /dev/sda1

# 交换分区
mkswap /dev/sda3
swapon /dev/sda3
```

### 挂载(/、boot、home)
``` bash
# 挂载
mount /dev/sda4 /mnt
mkdir /mnt/boot && mount /dev/sda2 /mnt/boot
mkdir /mnt/home && mount /dev/sda5 /mnt/home

# 如果是EFI(需要把EFI分区挂载到boot目录下)
mkdir /mnt/boot/efi && mount /dev/sda1 /mnt/boot/efi
```

### 编辑更新源
``` bash
vi /etc/pacman.d/mirrorlist
```
Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch

## 一、安装基本系统
``` bash
pacstrap /mnt base
```

### 生成磁盘挂载列表
``` bash
genfstab -U -p /mnt >> /mnt/etc/fstab
```

### 进入新系统
``` bash
arch-chroot /mnt
```

## 二、基础配置
``` bash
# 添加主机名
echo "Test" > /etc/hostname

# 键盘映射和字体
echo KEYMAP=us > /etc/vconsole.conf

# 时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 硬件时钟同步
hwclock --systohc --utc

# 字符编码
echo LANG=en_US.UTF-8 > /etc/locale.conf
vi /etc/locale.gen
	en_US.UTF8 UTF-8
	zh_CN.UTF8 UTF-8
# 更新编码
locale-gen
```

## 三、启动管理器
### 普通模式
``` bash
# 安装Grub2
pacman -S grub os-prober
# 安装到sda
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```
### EFI模式
``` bash
# 安装Grub2
pacman -S grub efibootmgr dosfstools
# 安装到sda
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=Arch_Grub --recheck
grub-mkconfig -o /boot/grub/grub.cfg
```

## 四、完成
### 设置root密码
``` bash
passwd root
```
### 卸载被挂载的分区
``` bash
# 退出系统
exit
# 取消挂载
umount /mnt/boot/efi
umount /mnt/{boot,home,}
# 重启
reboot
```
