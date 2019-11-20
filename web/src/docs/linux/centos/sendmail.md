## 1) 安装邮件服务
```bash
yum install sendmail mailx
```
### 开机启动
```bash
systemctl enable sendmail
systemctl start sendmail
```

### 发送测试邮件
```bash
# Shell命令
echo '邮件正文' | mail -s  '测试邮件' admin@webmis.vip
# PHP函数
mail('admin@webmis.vip','测试邮件','邮件正文','from: WebMIS< admin@webmis.vip >')
```

## 2) Smtp方式(解决垃圾邮件问题)
```bash
vi /etc/mail.rc
```
尾部添加
```bash
# SMTP
set from=WebMIS<EMAIL>
set smtp=smtp.163.com
set smtp-auth-user=EMAIL
set smtp-auth-password=PASSWD
set smtp-auth=login
```

## 发送测试邮件
```bash
# Shell命令
echo '邮件正文' | mail -s  '测试邮件' admin@webmis.vip
# PHP函数
exec("export LANG=en_US.UTF-8; echo '邮件正文' | mail -s  '测试邮件' admin@webmis.vip")
```

## 3) Python3方式
```bash
# 搜索
yum search pyton3
# 安装
yum install pyton36
# 查看版本
python36 -V
```
### Email.py 文件内容
```python
# /bin/python
# -*- coding: UTF-8 -*-

import sys
import json

import smtplib
from email.mime.text import MIMEText

class Email :

	# 构造函数
	def __init__(self):
		self.config={
			'smtp':'smtp.163.com',
			'port':'25',
			'user':'EMAIL',
			'passwd':'PASSWD',
			'alias':'牵引力'
		}

	# SMTP发送邮件
	def sendSmtp(self,mail,subject,body):
		me='%s<%s>'%(self.config['alias'],self.config['user'])
		msg=MIMEText(body,'plain','utf-8')
		msg['Subject']=subject
		msg['From']=me
		msg['To']=mail
		try :
			server=smtplib.SMTP()
			server.connect(self.config['smtp'],self.config['port'])
			server.login(self.config['user'],self.config['passwd'])
			server.sendmail(me,mail,msg.as_string())
			server.close()
			return {'state':'y','msg':'发送成功'}
		except Exception as e :
			return {'state':'n','msg':'%s: %s'%('发送错误',e)}

# 1.接收命令行参数:
# windows：python36 Email.py '{\"to\":\"EMAIL\",\"subject\":\"Python发邮件\",\"body\":\"欢迎学习牵引力PHP课程！\"}'
# linux：python36 Email.py '{"to":"EMAIL","subject":"Python发邮件","body":"欢迎学习牵引力PHP课程！"}'
prem=json.loads(sys.argv[1])

# 2.内部参数
# prem={'to':'EMAIL','subject':'Python发邮件','body':'欢迎学习牵引力PHP课程！'}

# 实例化
db=Email()
res=db.sendSmtp(prem['to'],prem['subject'],prem['body'])
print(res)
```
### 测试邮件发送
```bash
python Email.py '{"to":"EMAIL","subject":"Python发邮件","body":"欢迎学习牵引力PHP课程！"}'
```

## 4) Crontab定时任务
### 基本格式
```bash
* * * * * command
分 时 日 月 周 命令
```

### 使用方法
```bash
# 编辑
crontab -e
# 查看
crontab -l
```

### 定时邮件发送（index.php）
```php
// 系统时间
$date = date('Y-m-d H:i:s');

// 参数
$to='klingsoul@163.com';
$subject='PHP课程('.$date.')';
$body='欢迎学习牵引力PHP课程！';

// 方式一：PHPMailer
require 'email.php';
$res = sendSMTP(['to'=>$to,'subject'=>'PHPMailer：'.$subject,'body'=>$body]);
// 方式二：SendMail
exec('export LANG=en_US.UTF-8; echo "'.$body.'" | mail -s "SendMail：'.$subject.'" '.$to);
// 方式二：Python
system('export LANG=en_US.UTF-8; python36 Email.py \'{"to":"'.$to.'","subject":"Python：'.$subject.'","body":"'.$body.'"}\'');
```

