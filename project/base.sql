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
(1,	'LOGO',	'logo',	'upload/admin/logo202005221544223582.jpg',	NULL,	NULL),
(2,	'系统名称',	'title',	'基础系统',	NULL,	'2020-05-22 17:43:50'),
(3,	'网站域名',	'http',	'webmis.vip',	NULL,	'2020-05-22 17:43:50'),
(4,	'版权信息',	'copy',	'2020 WebMIS MIT license',	NULL,	'2020-05-22 17:43:50'),
(5,	'登录背景',	'login_bg',	'upload/admin/bg202005221544263469.jpg',	NULL,	NULL);

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
(1,	0,	'首页',	'',	0,	'icons icon_home',	'2018-12-15 00:00:00',	NULL,	0,	''),
(2,	0,	'系统',	'',	0,	'icons icon_config',	'2018-12-15 00:00:00',	NULL,	0,	''),
(3,	1,	'控制台',	'/',	1,	'',	'2018-12-15 00:00:00',	NULL,	0,	''),
(4,	2,	'文件目录',	'SysFileManage',	1,	'ico_mask ico_msg',	'2018-12-15 00:00:00',	'2020-05-22 18:06:13',	0,	''),
(5,	2,	'用户权限',	'SysPerm',	31,	'ico_mask ico_user',	'2018-12-15 00:00:00',	NULL,	0,	''),
(6,	2,	'角色权限',	'SysRole',	31,	'ico_mask ico_role',	'2018-12-15 00:00:00',	NULL,	0,	''),
(7,	0,	'业务',	'',	0,	'icons icon_service',	'2018-12-15 00:00:00',	NULL,	0,	''),
(8,	2,	'系统配置',	'SysConfig',	1,	'ico_mask ico_config',	'2018-12-15 00:00:00',	'2020-05-22 15:43:49',	0,	''),
(9,	2,	'系统菜单',	'SysMenus',	21,	'ico_mask ico_menu',	'2018-12-15 00:00:00',	'2020-05-22 15:48:36',	0,	''),
(10,	2,	'菜单动作',	'SysMenusAction',	31,	'ico_mask ico_action',	'2019-01-27 11:28:31',	NULL,	0,	''),
(11,	1,	'个人资料',	'UserInfo',	1,	'ico_mask ico_userinfo',	'2019-01-27 11:29:09',	'2020-05-22 13:43:41',	0,	''),
(12,	1,	'修改密码',	'UserPasswd',	1,	'ico_mask ico_passwd',	'2019-01-27 11:31:10',	'2019-06-29 18:21:32',	0,	''),
(13,	7,	'项目',	'SysFileManage',	1,	'ico_mask ico_file',	'2019-12-10 13:01:38',	'2020-05-22 18:06:04',	0,	'');

DROP TABLE IF EXISTS `sys_menus_action`;
CREATE TABLE `sys_menus_action` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `action` varchar(16) NOT NULL DEFAULT '' COMMENT '动作',
  `perm` enum('1','2','4','8','16','32','64','128','256','512','1024','2048') NOT NULL DEFAULT '1' COMMENT '权限值',
  `ico` varchar(32) DEFAULT '' COMMENT '图标样式',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='动作菜单';

INSERT INTO `sys_menus_action` (`id`, `name`, `action`, `perm`, `ico`, `ctime`, `utime`) VALUES
(1,	'全部',	'list',	'1',	'el-icon-refresh',	NULL,	NULL),
(2,	'搜索',	'sea',	'2',	'el-icon-search',	NULL,	NULL),
(3,	'添加',	'add',	'4',	'el-icon-plus',	NULL,	NULL),
(4,	'编辑',	'edit',	'8',	'el-icon-edit',	NULL,	NULL),
(5,	'删除',	'del',	'16',	'el-icon-delete',	NULL,	NULL),
(6,	'打印',	'print',	'32',	'el-icon-printer',	NULL,	NULL),
(7,	'导出',	'exp',	'64',	'el-icon-d-arrow-right',	NULL,	NULL),
(8,	'导入',	'imp',	'128',	'el-icon-d-arrow-left',	NULL,	NULL),
(9,	'图表',	'chart',	'256',	'el-icon-picture',	NULL,	NULL);

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


DROP TABLE IF EXISTS `user_perm`;
CREATE TABLE `user_perm` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '专属权限',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色权限',
  `state_admin` enum('0','1') NOT NULL DEFAULT '0' COMMENT '后台登录',
  `state_app` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'APP登录',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `user_perm` (`uid`, `ctime`, `utime`, `perm`, `role`, `state_admin`, `state_app`) VALUES
(1,	NULL,	'2020-05-22 18:05:48',	'1:0 2:0 3:1 4:1 5:31 6:31 7:0 8:1 9:21 10:31 11:1 12:1 13:1',	'',	'1',	'0'),
(202005221512161484,	'2020-05-22 15:12:16',	'2020-05-22 15:12:31',	NULL,	'1',	'1',	'1');

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色名称',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限';

INSERT INTO `user_role` (`id`, `role`, `utime`, `perm`) VALUES
(1,	'普通用户',	NULL,	'1:0 3:1 11:1 12:1');

-- 2020-05-22 10:11:34
