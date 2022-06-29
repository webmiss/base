## 开启远程登录
```bash
 vi /etc/ssh/sshd_config
```
- PasswordAuthentication yes
- systemctl restart ssh

## Sudo权限
```bash
chmod +w /etc/sudoers
vi /etc/sudoers
```
- webmis ALL=(ALL:ALL) NOPASSWD: ALL


## 交换空间
```bash
# 查看
swapon --show
free -m
# 创建
fallocate -l 8G /swapfile
# 权限
chmod 600 /swapfile
# 设置、激活
mkswap /swapfile
swapon /swapfile
# 开机挂载
vi /etc/fstab
```
- 末尾添加"/swapfile swap swap defaults 0 0"
#### 阿里云服务器
```bash
vi /etc/sysctl.conf
```
- vm.swappiness = 60
- reboot


## 防火墙( ufw )
```bash
# 添加端口
ufw allow 22/tcp
# 添加服务
ufw allow http
ufw allow https
ufw allow 3306
# 查看状态
ufw status
# 开机启动
systemctl enable ufw
```