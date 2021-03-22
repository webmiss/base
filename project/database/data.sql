-- Adminer 4.7.7 MySQL dump

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `api_menus`;
CREATE TABLE `api_menus` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `fid` smallint(5) unsigned NOT NULL COMMENT '父ID',
  `title` varchar(12) DEFAULT '' COMMENT '标题',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT 0 COMMENT '排序',
  `url` varchar(16) DEFAULT '' COMMENT '地址',
  `controller` varchar(32) DEFAULT '',
  `action` tinytext DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员菜单';

INSERT INTO `api_menus` (`id`, `fid`, `title`, `ico`, `ctime`, `utime`, `sort`, `url`, `controller`, `action`) VALUES
(1,	0,	'测试接口',	'',	NULL,	NULL,	0,	'',	'/api/demo',	'[{\"name\":\"列表\",\"action\":\"List\",\"ico\":\"icon-list\",\"perm\":1},{\"name\":\"列表\",\"action\":\"perm\",\"ico\":\"icon-list\",\"perm\":2}]');

DROP TABLE IF EXISTS `api_perm`;
CREATE TABLE `api_perm` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `api_perm` (`uid`, `utime`, `role`, `perm`) VALUES
(2,	NULL,	'1',	'');


DROP TABLE IF EXISTS `api_role`;
CREATE TABLE `api_role` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员角色';

INSERT INTO `api_role` (`id`, `role`, `ctime`, `utime`, `perm`) VALUES
(1,	'会员权限',	NULL,	NULL,	'1:2');

DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(128) NOT NULL DEFAULT '' COMMENT '参数值',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置';

INSERT INTO `sys_config` (`id`, `title`, `name`, `val`, `ctime`, `utime`) VALUES
(1,	'LOGO',	'logo',	'',	NULL,	NULL),
(2,	'系统名称',	'title',	'数据中心',	NULL,	NULL),
(3,	'网站域名',	'http',	'webmis.vip',	NULL,	NULL),
(4,	'版权信息',	'copy',	'2020 webmis.vip MIT license',	NULL,	NULL),
(5,	'登录背景',	'login_bg',	'',	NULL,	NULL);

DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `fid` smallint(5) unsigned NOT NULL COMMENT '父ID',
  `title` varchar(12) DEFAULT '' COMMENT '标题',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT 0 COMMENT '排序',
  `url` varchar(16) DEFAULT '' COMMENT '地址',
  `controller` varchar(32) DEFAULT '',
  `action` tinytext DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单';

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `ico`, `ctime`, `utime`, `sort`, `url`, `controller`, `action`) VALUES
(1,	0,	'首页',	'icons icon_home',	NULL,	NULL,	0,	'',	'',	''),
(2,	0,	'设置',	'icons icon_system',	NULL,	NULL,	0,	'',	'',	''),
(3,	0,	'业务',	'icons icon_menu',	NULL,	NULL,	0,	'',	'',	''),
(4,	1,	'控制台',	'icons icon_dasktop',	NULL,	NULL,	0,	'/',	'',	''),
(5,	1,	'个人资料',	'icons icon_user_info',	NULL,	NULL,	0,	'UserInfo',	'',	''),
(6,	1,	'修改密码',	'icons icon_user_passwd',	NULL,	NULL,	0,	'UserPasswd',	'',	''),
(7,	2,	'文件目录',	'icons icon_sys_folder',	NULL,	NULL,	0,	'SysFileManage',	'',	''),
(8,	2,	'用户管理',	'icons icon_sys_user',	NULL,	NULL,	0,	'SysUser',	'/admin/user',	'[{\"type\":\"1\",\"name\":\"列表\",\"action\":\"List\",\"ico\":\"icon-list\",\"perm\":1},{\"type\":\"1\",\"name\":\"添加\",\"action\":\"Add\",\"ico\":\"icon-add\",\"perm\":2},{\"type\":\"2\",\"name\":\"验证\",\"action\":\"token\",\"ico\":\"icon-add\",\"perm\":4}]'),
(9,	2,	'会员菜单',	'icons icon_sys_menu',	NULL,	NULL,	0,	'ApiMenus',	'',	''),
(10,	2,	'会员角色',	'icons icon_sys_role',	NULL,	NULL,	0,	'ApiRole',	'',	''),
(11,	2,	'系统配置',	'icons icon_sys_config',	NULL,	NULL,	0,	'SysConfig',	'',	''),
(12,	2,	'系统菜单',	'icons icon_sys_menu',	NULL,	NULL,	0,	'SysMenus',	'',	''),
(13,	2,	'系统角色',	'icons icon_sys_role',	NULL,	NULL,	0,	'SysRole',	'',	''),
(14,	3,	'Demo',	'icons icon_app',	NULL,	NULL,	0,	'Demo',	'',	'');

DROP TABLE IF EXISTS `sys_perm`;
CREATE TABLE `sys_perm` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `sys_perm` (`uid`, `utime`, `role`, `perm`) VALUES
(1,	NULL,	'',	'1:0 2:0 3:0 4:1 5:1 7:1 8:2 9:31 10:1 11:31 12:31 13:31 14:31');

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统角色';

INSERT INTO `sys_role` (`id`, `role`, `ctime`, `utime`, `perm`) VALUES
(1,	'基础权限',	NULL,	NULL,	'1:0 3:0 4:1 5:1 6:1 14:1');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(18) unsigned NOT NULL COMMENT 'ID',
  `uname` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `rtime` datetime DEFAULT NULL COMMENT '注册时间',
  `ltime` datetime DEFAULT NULL COMMENT '登录时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户帐号';

INSERT INTO `user` (`id`, `uname`, `tel`, `email`, `password`, `rtime`, `ltime`, `utime`, `state`) VALUES
(1,	'admin',	'',	'',	'e10adc3949ba59abbe56e057f20f883e',	NULL,	NULL,	NULL,	'1'),
(2,	'15000000000',	'',	'',	'e10adc3949ba59abbe56e057f20f883e',	NULL,	NULL,	NULL,	'1');

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `nickname` varchar(8) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(8) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(8) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息';

INSERT INTO `user_info` (`uid`, `utime`, `nickname`, `position`, `name`, `gender`, `birthday`, `img`) VALUES
(1,	NULL,	'WebMIS',	'系统开发',	'管理员',	'男',	'1984-12-17',	''),
(2,	NULL,	'User',	'测试',	'会员',	'男',	'1984-12-17',	'');

DROP TABLE IF EXISTS `user_msg`;
CREATE TABLE `user_msg` (
  `id` bigint(18) unsigned NOT NULL COMMENT 'ID',
  `type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0消息,1其他',
  `uid` varchar(18) NOT NULL DEFAULT '0' COMMENT 'UID',
  `fid` varchar(16) NOT NULL DEFAULT '0' COMMENT '发送者ID',
  `ctime` datetime DEFAULT NULL COMMENT '发布时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `is_new` text NOT NULL DEFAULT '[]' COMMENT '标记阅读',
  `is_del` text NOT NULL DEFAULT '[]' COMMENT '标记删除',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `content` varchar(300) NOT NULL DEFAULT '' COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息';


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

DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(16) NOT NULL,
  `ctime` datetime DEFAULT NULL,
  `utime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2020-06-09 01:54:55
