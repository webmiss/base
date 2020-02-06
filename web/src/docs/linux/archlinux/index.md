## 修复Grub2引导（重装windows无法启动Linux问题）
``` bash
# 查看分区
grub rescue> ls

# Grub目录
grub rescue> ls (hd0,gpt8)/boot/grub

# 调出启动菜单（boot分区到gpt8）
grub rescue> root=(hd0,gpt8)
grub rescue> prefix=(hd0,gpt8)/grub
grub rescue> set root=(hd0,gpt8)
grub rescue> set prefix=(hd0,gpt8)/grub
grub rescue> insmod normal
grub rescue> normal
```

### 修复引导
``` bash
# 进入系统后

# 1) BIOS启动模式
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg

# 2) EFI启动模式
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=Arch_Grub --recheck
grub-mkconfig -o /boot/grub/grub.cfg

# 3) MBR引导
menuentry "Windows 7" {
	insmod ntfs
	set root=(hd0,1)
	chainloader +1
}

# 4) GPT引导
menuentry "Windows 10" {
	search --file --no-floppy --set=root /EFI/Microsoft/Boot/bootmgfw.efi
	chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi
}
```

## 效应时间
``` bash
timedatectl set-ntp true
```
