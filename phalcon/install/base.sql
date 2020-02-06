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
(1,	'LOGO',	'logo',	'upload/admin/logo201911202231073347.png',	NULL),
(2,	'系统名称',	'title',	'基础系统',	NULL),
(3,	'网站域名',	'http',	'webmis.vip',	NULL),
(4,	'版权信息',	'copy',	'2020 WebMIS MIT license',	NULL),
(5,	'登录背景',	'login_bg',	'upload/admin/bg201911202224218524.png',	NULL);

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
(4,	7,	'我的消息',	'WebMsg',	19,	'ico_mask ico_msg',	'2018-12-15 00:00:00',	NULL,	0,	''),
(5,	7,	'用户管理',	'SysUser',	31,	'ico_mask ico_user',	'2018-12-15 00:00:00',	NULL,	0,	''),
(6,	2,	'角色权限',	'SysRole',	31,	'ico_mask ico_role',	'2018-12-15 00:00:00',	NULL,	0,	''),
(7,	0,	'平台',	'',	0,	'ico_mask ico_platform',	'2018-12-15 00:00:00',	NULL,	0,	''),
(8,	2,	'基本配置',	'SysConfig',	1,	'ico_mask ico_config',	'2018-12-15 00:00:00',	'2019-06-25 12:53:50',	0,	''),
(9,	2,	'菜单管理',	'SysMenus',	21,	'ico_mask ico_menu',	'2018-12-15 00:00:00',	'2019-12-10 13:00:34',	0,	''),
(10,	2,	'菜单动作',	'SysMenusAction',	31,	'ico_mask ico_action',	'2019-01-27 11:28:31',	NULL,	0,	''),
(11,	1,	'基本资料',	'UserInfo',	1,	'ico_mask ico_userinfo',	'2019-01-27 11:29:09',	NULL,	0,	''),
(12,	1,	'修改密码',	'UserPasswd',	1,	'ico_mask ico_passwd',	'2019-01-27 11:31:10',	'2019-06-29 18:21:32',	0,	''),
(13,	2,	'文件目录',	'SysFileManage',	1,	'ico_mask ico_file',	'2019-12-10 13:01:38',	'2019-12-10 13:19:49',	0,	'');

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

DROP TABLE IF EXISTS `user_perm`;
CREATE TABLE `user_perm` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(10) unsigned NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text COMMENT '专属权限',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色权限',
  `state_admin` enum('0','1') NOT NULL DEFAULT '0' COMMENT '后台登录',
  `state_app` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'APP登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `user_perm` (`id`, `uid`, `utime`, `perm`, `role`, `state_admin`, `state_app`) VALUES
(1,	1,	NULL,	'1:0 2:0 3:1 4:19 5:31 6:31 7:0 8:1 9:23 10:31 11:1 12:1 13:1',	'0',	'1',	'1');

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

-- 2020-01-15 04:24:17
