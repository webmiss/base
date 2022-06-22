# Github-SSH方式

## 用户名、邮箱
``` bash
git config --global user.name "webmis"
git config --global user.email "klingsoul@163.com"
```

## RSA密钥
``` bash
ssh-keygen -t rsa -C "klingsoul@163.com"
```
- 将"~/.ssh/id_rsa.pub" 拷贝到 Github >  SSH and GPG keys

## 克隆项目
``` bash
git clone git@github.com:webmiss/base.git ./base
```