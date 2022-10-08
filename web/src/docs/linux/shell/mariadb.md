## 优化( mysql -uroot -p )
```bash
# 开启表InnoDB: 1开启、0关闭
set global innodb_file_per_table = 1;
# 缓冲池(kb): 查询专用(物理内存*75%)、默认(134217728=128M)
set global innodb_buffer_pool_size = 4*1024*1024*1024*0.75;
# 最大连接数: 小网站(100~200)、中型(500~800)、大型(1000~2000)
set global max_connections = 600;
# 查询缓存容量: 通常设置为(200-300)MB
set global query_cache_limit = 256;
set global query_cache_min_res_unit = 2;
set global query_cache_size = 300*1024*1024;
set global query_cache_type = 1;
# 临时表容量和内存表最大容量: 建议(64M/1G)
set global tmp_table_size = 4*64*1024*1024;
set global max_heap_table_size = 4*64*1024*1024;
# 检查空闲连接: 建议(90秒/次)
set global wait_timeout = 90;
set global interactive_timeout = 90;
```

#### 配置文件( vi /etc/my.cnf.d/server.cnf )
```bash
[mysqld]
# 禁用DNS反向查询
skip-name-resolve
# 慢查询日志: 优化查询语句
slow-query-log = 1
long_query_time = 2
slow-query-log-file = /var/lib/mysql/mysql-slow.log
```

#### 其他
```bash
# 避免使用交换空间
sysctl vm.swappiness
sysctl -w vm.swappiness=0
```

<br/>

## 常用命令
### 设置root账户
``` bash
# 新密码
mysql_secure_installation

# 登陆
mysql -uroot -p

# 设置新密码
mysqladmin -u root -password <新密码>

# 修改密码
mysqladmin -u root -p <旧密码> password <新密码>

# 查看配置
show global variables like 'innodb_file_per_table';
show global status like 'innodb_file_per_table';

# 更改配置
set global innodb_file_per_table = 1;
```
### 创建用户
``` bash
# 创建新用户
CREATE USER '<用户名>'@'<localhost>' IDENTIFIED BY '<密码>';

# 添加权限
GRANT ALL PRIVILEGES ON '<指定数据库>.*' TO '<用户名>'@'<localhost>';
FLUSH PRIVILEGES;

# 显示所有用户
select host,user from mysql.user;

# 删除用户
drop user '<用户名>'@'localhost';
```

### 数据库
``` bash
# 查看
show databases;

# 使用
use `<数据库名>`;

# 查看-数据库编码
show variables like 'character_set_database';
# 查看-最大连接数
show variables like '%max_connection%';
# 查看-当前连接
show processlist;

# 新建数据库
create database `<数据库名>`;
# 新建数据库并设置编码
create database `<数据库名>` default character set <utf8> collate <utf8_general_ci>;
# 更改数据库编码
alter database `<数据库名>` default character set <utf8> collate <utf8_general_ci>;

# 删除
drop database `<数据库名>`;
```

### 数据表
``` bash
# 查看
show tables;

# 创建数据表
create table `<数据库名>`.`<表名>`;

# 查看编码
show create table `<表名>`;
# 修改编码格式
alter table `<表名>` character set <utf8>;

# 删除
drop table `<表名>`;
```

### 字段
``` bash
# 查看
show create table `<表名>`;
# 字段列信息
show columns from `<表名>`

# 添加
alter table `<表名>` add `<字段名>` varchar(6) not null COMMENT '<备注>' AFTER `<字段后>`;

# 修改
alter table `<表名>` change `<字段名>` `<字段名>` varchar(12) character set utf8 COLLATE utf8_general_ci NOT NULL COMMENT '<备注>';

# 删除
alter table `<表名>` drop `<字段名>`;
```

### 索引
``` bash
# 索引信息
show index from `<表名>`

# 添加索引
alter table `<数据库名>`.`<表名>` ADD PRIMARY KEY (`<字段1>`(长度), `<字段2>`(长度));
# - PRIMARY 主键，唯一不能为空。
# - INDEX 索引，普通的。
# - UNIQUE 唯一索引，不允许有重复可以为空。
# - FULLTEXT 是全文索引，用于在一篇文章中，检索文本信息的。

# 删除索引
alter table `<表名>` DROP INDEX `<字段>`;
```

### 分区
``` bash
# 用户表
CREATE TABLE `test`.`user` (
    `id` INT (10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `username` VARCHAR (32) NOT NULL COMMENT '用户名',
    `password` VARCHAR (32) NOT NULL COMMENT '密码',
    `state` ENUM ('0', '1') NOT NULL DEFAULT '1' COMMENT '状态(0禁用,1正常)',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

# 添加数据
INSERT INTO
    `user` (`id`, `username`, `password`, `state`)
VALUES
    (NULL, 'user1', '123456', '1'),
    (NULL, 'user2', '123456', '1'),
    (NULL, 'user3', '123456', '1');

# 分区（RANGE）
ALTER TABLE `user` partition BY RANGE(id)(
    partition p0 VALUES LESS THAN (3),
    partition p1 VALUES LESS THAN (6),
    partition p2 VALUES LESS THAN (9)
);

# 查看
EXPLAIN PARTITIONS SELECT * FROM `user`;

# 添加（RANGE）
ALTER TABLE `user` ADD partition(
    partition p3 VALUES LESS THAN maxvalue
);

# 拆分
ALTER TABLE `user` REORGANIZE partition p3 into(
    partition p3 VALUES LESS THAN (12),
    partition p4 VALUES LESS THAN maxvalue
);

# 合并
ALTER TABLE `user` REORGANIZE partition p3,p4 into(
    partition p3 VALUES LESS THAN maxvalue
);

# 删除（包括数据）
ALTER TABLE `user` DROP partition p0;
# 删除（恢复非分区状态）
ALTER TABLE `user` REMOVE partitioning;

```

### 外键
``` bash
# 创建数据库
create database `test` default character set utf8 collate utf8_general_ci;

# 用户基础表
CREATE TABLE `test`.`user` (
	`id` SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID' ,
	`name` VARCHAR(12) NOT NULL COMMENT '姓名' ,
	`sex` ENUM('男','女') NOT NULL DEFAULT '男' COMMENT '性别' ,
	`age` TINYINT(3) NOT NULL DEFAULT 20 COMMENT '年龄' ,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;

# 用户信息表
CREATE TABLE `test`.`user_info` (
	`id` SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID' ,
	`uid` SMALLINT(6) UNSIGNED NOT NULL COMMENT 'UID' ,
	`content` TEXT NOT NULL DEFAULT '' COMMENT '内容' ,
	PRIMARY KEY (`id`),
) ENGINE = InnoDB;

# 添加索引
alter table `test`.`user_info` ADD PRIMARY KEY (`uid`);

# 添加外键
ALTER TABLE `user` ADD CONSTRAINT `<外键名称>` FOREIGN KEY (`id`) REFERENCES `user_info`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
# - CASCADE 在父表上update/delete记录时，同步update/delete掉子表的匹配记录 
# - SET NULL 在父表上update/delete记录时，将子表上匹配记录的列设为null (要注意子表的外键列不能为not null)  
# - NO ACTION 如果子表中有匹配的记录,则不允许对父表对应候选键进行update/delete操作  
# - RESTRICT 同no action, 都是立即检查外键约束

# 删除外键
alter table test.user DROP FOREIGN KEY `<外键名称>`;
```

### 数据
``` bash
# 查询
SELECT * FROM `user` WHERE id=1;

# 添加
INSERT INTO `user`( `name`, `sex`, `age`) VALUES ('张三','1',25);

# 更新
UPDATE `user` SET `name`='李四',`sex`='2',`age`=20 WHERE id=1;

# 删除
DELETE FROM `user` WHERE id=1;
```

## 备份和恢复
``` bash
vi /home/mysql.sh
```
### 1) MySQL备份
``` bash
#!/bin/bash
uname=root
passwd=***
dbname=***
path=***_`date '+%Y-%m-%d'`.sql
mysqldump -u$uname -p$passwd --databases $dbname --lock-all-tables --flush-logs > $path
```
### 2) MySQL恢复
``` bash
#!/bin/bash
mysql -u$uname -p$passwd $dbname < $path
```

### 3) 定时执行(每天23:30执行备份)
``` bash
# 添加定时
crontab -e
# 内容
30 23 * * * sh /home/mysql.sh
```

### 4) 备份差异到本地目录
``` bash
rsync -rvu --delete root@IP:/home/test/ /home/test
```

### 5) 数据恢复
``` bash
mysql -u 用户名 -p密码 数据库名 < 备份的数据库.sql
```

## SSH免密码登录
### 方法一：
``` bash
# 生成公钥
ssh-keygen -t rsa
# 将公钥放到服务器上
scp ~/.ssh/id_rsa.pub root@IP:~/.ssh/authorized_keys
```
### 方法二：
``` bash
pacman -S sshpass
sshpass -p '你的密码' ssh root@IP
```