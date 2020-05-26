-- Adminer 4.7.7 MySQL dump

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
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置';

INSERT INTO `sys_config` (`id`, `title`, `name`, `val`, `ctime`, `utime`) VALUES
(1,	'LOGO',	'logo',	'upload/admin/logo202005221540122906.png',	NULL,	NULL),
(2,	'系统名称',	'title',	'数据中心',	NULL,	'2020-05-22 17:44:08'),
(3,	'网站域名',	'http',	'webmis.vip',	NULL,	'2020-05-22 17:44:08'),
(4,	'版权信息',	'copy',	'2020 webmis.vip MIT license',	NULL,	'2020-05-22 17:44:08'),
(5,	'登录背景',	'login_bg',	'upload/admin/bg202005221540246780.png',	NULL,	NULL);

DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `fid` tinyint(3) unsigned NOT NULL COMMENT '父ID',
  `title` varchar(12) DEFAULT '' COMMENT '标题',
  `url` varchar(32) DEFAULT '' COMMENT '地址',
  `perm` int(6) unsigned DEFAULT 0 COMMENT '预设权限',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT 0 COMMENT '排序',
  `remark` varchar(32) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单';

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `url`, `perm`, `ico`, `ctime`, `utime`, `sort`, `remark`) VALUES
(1,	0,	'首页',	'',	0,	'icon_home',	'2018-12-15 00:00:00',	'2020-05-26 10:49:37',	0,	''),
(2,	0,	'设置',	'',	0,	'icon_system',	'2018-12-15 00:00:00',	'2020-05-26 10:52:53',	0,	''),
(3,	1,	'控制台',	'/',	1,	'icon_dasktop',	'2018-12-15 00:00:00',	'2020-05-26 10:54:38',	0,	''),
(4,	2,	'文件目录',	'SysFileManage',	1,	'icon_sys_folder',	'2018-12-15 00:00:00',	'2020-05-26 10:58:39',	0,	''),
(5,	2,	'用户权限',	'SysPerm',	31,	'icon_sys_perm',	'2018-12-15 00:00:00',	'2020-05-26 10:59:08',	0,	''),
(6,	2,	'用户角色',	'SysRole',	31,	'icon_sys_role',	'2018-12-15 00:00:00',	'2020-05-26 10:59:20',	0,	''),
(7,	0,	'业务',	'',	0,	'icon_menu',	'2018-12-15 00:00:00',	'2020-05-26 10:53:05',	0,	''),
(8,	2,	'系统配置',	'SysConfig',	1,	'icon_sys_config',	'2018-12-15 00:00:00',	'2020-05-26 10:59:47',	0,	''),
(9,	2,	'系统菜单',	'SysMenus',	21,	'icon_sys_menu',	'2018-12-15 00:00:00',	'2020-05-26 10:59:59',	0,	''),
(10,	2,	'菜单动作',	'SysMenusAction',	31,	'icon_sys_action',	'2019-01-27 11:28:31',	'2020-05-26 11:00:28',	0,	''),
(11,	1,	'个人资料',	'UserInfo',	1,	'icon_user_info',	'2019-01-27 11:29:09',	'2020-05-26 10:54:55',	0,	''),
(12,	1,	'修改密码',	'UserPasswd',	1,	'icon_user_passwd',	'2019-01-27 11:31:10',	'2020-05-26 10:58:26',	0,	''),
(13,	2,	'用户管理',	'SysUser',	31,	'icon_sys_user',	'2020-05-22 16:02:56',	'2020-05-26 11:00:40',	0,	''),
(14,	7,	'应用管理',	'WebAPP',	31,	'icon_app',	'2020-05-22 18:10:32',	'2020-05-26 11:00:54',	0,	'');

DROP TABLE IF EXISTS `sys_menus_action`;
CREATE TABLE `sys_menus_action` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `action` varchar(16) NOT NULL DEFAULT '' COMMENT '动作',
  `perm` enum('1','2','4','8','16','32','64','128','256','512','1024','2048') NOT NULL DEFAULT '1' COMMENT '权限值',
  `ico` varchar(32) DEFAULT '' COMMENT '图标样式',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户帐号';

INSERT INTO `user` (`id`, `uname`, `tel`, `email`, `password`, `rtime`, `ltime`, `utime`, `state`) VALUES
(1,	'admin',	'',	'',	'8d37796cd6857b5b2d6721b2d25829ee',	'2018-12-15 00:00:00',	'2020-05-25 14:09:01',	'2020-05-25 14:09:01',	'1'),
(202005221512161484,	'',	'15087738003',	'',	'8d37796cd6857b5b2d6721b2d25829ee',	'2020-05-22 15:12:16',	'2020-05-22 15:13:16',	'2020-05-22 15:13:16',	'1');

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `nickname` varchar(8) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(8) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(8) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';

INSERT INTO `user_info` (`uid`, `nickname`, `position`, `name`, `gender`, `birthday`, `img`, `ctime`, `utime`) VALUES
(1,	'WebMIS',	'系统开发',	'杨文春',	'男',	'1984-12-17',	'upload/user/img/202005221420401374.png',	NULL,	'2020-05-22 14:25:06'),
(202005221454499568,	'WebMIS',	'程序员',	'杨',	'男',	'1984-12-17',	'upload/user/img/202005221505096651.png',	'2020-05-22 14:56:09',	'2020-05-22 15:06:09'),
(202005221512161484,	'',	'',	'',	'',	NULL,	'',	'2020-05-22 15:12:17',	NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';


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
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '专属权限',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色权限',
  `state_admin` enum('0','1') NOT NULL DEFAULT '0' COMMENT '后台登录',
  `state_app` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'APP登录',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `user_perm` (`uid`, `utime`, `perm`, `role`, `state_admin`, `state_app`) VALUES
(1,	'2020-05-22 18:10:48',	'1:0 2:0 3:1 4:1 5:31 6:31 7:0 8:1 9:21 10:31 11:1 12:1 13:31 14:31',	'0',	'1',	'0');

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色名称',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限';

INSERT INTO `user_role` (`id`, `role`, `ctime`, `utime`, `perm`) VALUES
(1,	'普通用户',	NULL,	NULL,	'1:0 3:1 11:1 12:1');

-- 2020-05-26 04:28:29
