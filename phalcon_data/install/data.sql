-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(128) NOT NULL DEFAULT '' COMMENT '参数值',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置';

INSERT INTO `sys_config` (`id`, `title`, `name`, `val`, `utime`) VALUES
(1,	'LOGO',	'logo',	'upload/admin/logo201907011221423386.jpg',	NULL),
(2,	'系统名称',	'title',	'数据中心',	NULL),
(3,	'网站域名',	'http',	'ynjici.com',	NULL),
(4,	'版权信息',	'copy',	'2020 ynjici.com MIT license',	NULL),
(5,	'登录背景',	'login_bg',	'upload/admin/bg201907011002287127.jpg',	NULL);

DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `fid` tinyint(3) unsigned NOT NULL COMMENT '父ID',
  `title` varchar(12) NOT NULL COMMENT '标题',
  `url` varchar(32) DEFAULT '' COMMENT '地址',
  `perm` int(6) unsigned DEFAULT '0' COMMENT '预设权限',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT '0' COMMENT '排序',
  `remark` varchar(32) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单';

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `url`, `perm`, `ico`, `ctime`, `utime`, `sort`, `remark`) VALUES
(1,	0,	'首页',	'',	0,	'ico_mask ico_home',	'2018-12-15 00:00:00',	NULL,	0,	''),
(2,	0,	'设置',	'',	0,	'ico_mask ico_system',	'2018-12-15 00:00:00',	NULL,	0,	''),
(3,	1,	'控制台',	'/',	1,	'',	'2018-12-15 00:00:00',	NULL,	0,	''),
(4,	1,	'我的消息',	'WebMsg',	19,	'ico_mask ico_msg',	'2018-12-15 00:00:00',	NULL,	0,	''),
(5,	2,	'用户管理',	'SysUser',	31,	'ico_mask ico_user',	'2018-12-15 00:00:00',	NULL,	0,	''),
(6,	2,	'角色权限',	'SysRole',	31,	'ico_mask ico_role',	'2018-12-15 00:00:00',	NULL,	0,	''),
(7,	0,	'平台',	'',	0,	'ico_mask ico_platform',	'2018-12-15 00:00:00',	NULL,	0,	''),
(8,	2,	'基本配置',	'SysConfig',	1,	'ico_mask ico_config',	'2018-12-15 00:00:00',	'2019-06-25 12:53:50',	0,	''),
(9,	2,	'菜单管理',	'SysMenus',	31,	'ico_mask ico_menu',	'2018-12-15 00:00:00',	NULL,	0,	''),
(10,	2,	'菜单动作',	'SysMenusAction',	31,	'ico_mask ico_action',	'2019-01-27 11:28:31',	NULL,	0,	''),
(11,	1,	'基本资料',	'UserInfo',	1,	'ico_mask ico_userinfo',	'2019-01-27 11:29:09',	NULL,	0,	''),
(12,	1,	'修改密码',	'UserPasswd',	1,	'ico_mask ico_passwd',	'2019-01-27 11:31:10',	'2019-06-29 18:21:32',	0,	'');

DROP TABLE IF EXISTS `sys_menus_action`;
CREATE TABLE `sys_menus_action` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '名称',
  `action` varchar(16) NOT NULL COMMENT '动作',
  `perm` enum('1','2','4','8','16','32','64','128','256','512','1024','2048') NOT NULL COMMENT '权限值',
  `ico` varchar(32) DEFAULT NULL COMMENT '图标样式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='动作菜单';

INSERT INTO `sys_menus_action` (`id`, `name`, `action`, `perm`, `ico`) VALUES
(1,	'全部',	'list',	'1',	'el-icon-refresh'),
(2,	'搜索',	'sea',	'2',	'el-icon-search'),
(3,	'添加',	'add',	'4',	'el-icon-plus'),
(4,	'编辑',	'edit',	'8',	'el-icon-edit'),
(5,	'删除',	'del',	'16',	'el-icon-delete'),
(6,	'打印',	'print',	'32',	'el-icon-printer'),
(7,	'导出',	'exp',	'64',	'el-icon-d-arrow-right'),
(8,	'导入',	'imp',	'128',	'el-icon-d-arrow-left'),
(9,	'图表',	'chart',	'256',	'el-icon-picture');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `cid` varchar(16) NOT NULL DEFAULT '' COMMENT '合作者ID',
  `uname` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `rtime` datetime DEFAULT NULL COMMENT '注册时间',
  `ltime` datetime DEFAULT NULL COMMENT '登录时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  `state_admin` enum('0','1') NOT NULL DEFAULT '0' COMMENT '后台登录',
  `state_app` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'APP登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户帐号';

INSERT INTO `user` (`id`, `cid`, `uname`, `tel`, `email`, `password`, `rtime`, `ltime`, `utime`, `state`, `state_admin`, `state_app`) VALUES
(1,	'1',	'admin',	'',	'',	'e10adc3949ba59abbe56e057f20f883e',	'2018-12-15 00:00:00',	'2020-01-14 17:23:53',	'2019-07-01 10:50:30',	'1',	'1',	'0');

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(10) unsigned NOT NULL COMMENT 'uid',
  `nickname` varchar(6) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(12) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(12) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';

INSERT INTO `user_info` (`id`, `uid`, `nickname`, `position`, `name`, `gender`, `birthday`, `img`) VALUES
(1,	1,	'WebMIS',	'系统开发',	'杨文春',	'男',	'1984-12-17',	'upload/user/img/201912201730593542.png');

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `user_oauth`;
CREATE TABLE `user_oauth` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `client_id` varchar(32) NOT NULL COMMENT '合作者ID',
  `client_secret` varchar(32) NOT NULL COMMENT '密钥',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_oauth` (`id`, `client_id`, `client_secret`, `state`, `name`) VALUES
(1,	'base@webmis.vip',	'00fb626bbabfdd903231acf6639cddfb',	'1',	'基础系统');

DROP TABLE IF EXISTS `user_perm`;
CREATE TABLE `user_perm` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(10) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text COMMENT '专属权限',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `user_perm` (`id`, `uid`, `utime`, `perm`, `role`) VALUES
(1,	1,	NULL,	'1:0 2:0 3:1 4:19 5:31 6:31 8:1 9:31 10:31 11:1 12:1',	'0'),
(2,	2,	NULL,	'',	'0');

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色名称',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限';

INSERT INTO `user_role` (`id`, `role`, `utime`, `perm`) VALUES
(1,	'普通用户',	NULL,	'1:0 3:1 4:19 11:1 12:1');

DROP TABLE IF EXISTS `web_msg`;
CREATE TABLE `web_msg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` varchar(16) NOT NULL DEFAULT '0' COMMENT 'UID',
  `fid` varchar(16) NOT NULL DEFAULT '0' COMMENT '发送者ID',
  `gid` varchar(16) NOT NULL DEFAULT '0' COMMENT '消息组ID',
  `ctime` datetime DEFAULT NULL COMMENT '发布时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `is_new` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0新,1阅读',
  `type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0消息,1转诊',
  `title` varchar(16) NOT NULL COMMENT '标题',
  `content` varchar(300) NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';


DROP TABLE IF EXISTS `web_msg_group`;
CREATE TABLE `web_msg_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '组名称',
  `uid` varchar(16) NOT NULL COMMENT '创建人uid',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `user` text COMMENT '成员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `web_msg_group` (`id`, `name`, `uid`, `ctime`, `utime`, `user`) VALUES
(1,	'系统消息',	'1',	'2019-12-31 17:36:55',	NULL,	NULL),
(2,	'消息群',	'9',	'2019-12-31 17:36:55',	NULL,	'[\"5\",\"7\",\"8\",\"9\"]');

-- 2020-01-15 04:21:15
