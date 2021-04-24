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
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT 0 COMMENT '排序',
  `url` varchar(16) DEFAULT '' COMMENT '地址',
  `controller` varchar(32) DEFAULT '',
  `action` tinytext DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员菜单';

INSERT INTO `api_menus` (`id`, `fid`, `title`, `ico`, `ctime`, `utime`, `sort`, `url`, `controller`, `action`) VALUES
(1,	0,	'测试接口',	'',	0,	0,	0,	'',	'/api/demo',	'[{\"name\":\"列表\",\"action\":\"List\",\"ico\":\"icon-list\",\"perm\":1},{\"name\":\"列表\",\"action\":\"perm\",\"ico\":\"icon-list\",\"perm\":2}]');

DROP TABLE IF EXISTS `api_perm`;
CREATE TABLE `api_perm` (
  `uid` bigint(19) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `role` smallint(5) unsigned NOT NULL DEFAULT 1 COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `api_perm` (`uid`, `utime`, `role`, `perm`) VALUES
(1,	0,	1,	''),
(2,	0,	1,	'');


DROP TABLE IF EXISTS `api_role`;
CREATE TABLE `api_role` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员角色';

INSERT INTO `api_role` (`id`, `role`, `ctime`, `utime`, `perm`) VALUES
(1,	'会员权限',	0,	0,	'1:2');

DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(128) NOT NULL DEFAULT '' COMMENT '参数值',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置';

INSERT INTO `sys_config` (`id`, `title`, `name`, `val`, `ctime`, `utime`) VALUES
(1,	'LOGO',	'logo',	'',	0,	0),
(2,	'系统名称',	'title',	'数据中心',	0,	0),
(3,	'网站域名',	'http',	'webmis.vip',	0,	0),
(4,	'版权信息',	'copy',	'2020 webmis.vip MIT license',	0,	0),
(5,	'登录背景',	'login_bg',	'',	0,	0);

DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `fid` smallint(5) unsigned NOT NULL COMMENT '父ID',
  `title` varchar(12) DEFAULT '' COMMENT '标题',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `sort` tinyint(3) unsigned DEFAULT 0 COMMENT '排序',
  `url` varchar(16) DEFAULT '' COMMENT '地址',
  `controller` varchar(32) DEFAULT '',
  `action` text DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单';

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `ico`, `ctime`, `utime`, `sort`, `url`, `controller`, `action`) VALUES
(1,	0,	'首页',	'icons icon_home',	0,	0,	0,	'',	'',	''),
(2,	0,	'设置',	'icons icon_system',	0,	0,	0,	'',	'',	''),
(3,	0,	'业务',	'icons icon_menu',	0,	0,	0,	'',	'',	''),
(4,	1,	'控制台',	'icons icon_dasktop',	0,	0,	0,	'/',	'',	''),
(5,	1,	'个人资料',	'icons icon_user_info',	0,	0,	0,	'UserInfo',	'/admin/userinfo',	'[{\"type\":\"2\",\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"type\":\"2\",\"name\":\"编辑\",\"action\":\"edit\",\"perm\":2},{\"type\":\"2\",\"name\":\"头像\",\"action\":\"upimg\",\"perm\":4}]'),
(6,	1,	'修改密码',	'icons icon_user_passwd',	0,	0,	0,	'UserPasswd',	'/admin/userpasswd',	'[{\"type\":\"2\",\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"type\":\"2\",\"name\":\"编辑\",\"action\":\"edit\",\"perm\":2}]'),
(7,	2,	'文件目录',	'icons icon_sys_folder',	0,	0,	0,	'SysFileManage',	'/admin/sysfile',	'[{\"type\":\"2\",\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"type\":\"1\",\"name\":\"新建文件夹\",\"action\":\"mkdir\",\"perm\":2},{\"type\":\"1\",\"name\":\"重命名\",\"action\":\"rename\",\"perm\":4},{\"type\":\"1\",\"name\":\"上传\",\"action\":\"upload\",\"perm\":8},{\"type\":\"2\",\"name\":\"下载\",\"action\":\"down\",\"perm\":16},{\"type\":\"1\",\"name\":\"删除\",\"action\":\"remove\",\"perm\":32}]'),
(8,	2,	'用户管理',	'icons icon_sys_user',	0,	0,	0,	'SysUser',	'/admin/sysuser',	'[{\"type\":\"1\",\"name\":\"刷新\",\"action\":\"list\",\"perm\":1},{\"type\":\"1\",\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"type\":\"1\",\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"type\":\"1\",\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"type\":\"1\",\"name\":\"删除\",\"action\":\"del\",\"perm\":16}]'),
(9,	2,	'会员菜单',	'icons icon_sys_menu',	0,	0,	0,	'ApiMenus',	'',	''),
(10,	2,	'会员角色',	'icons icon_sys_role',	0,	0,	0,	'ApiRole',	'',	''),
(11,	2,	'系统配置',	'icons icon_sys_config',	0,	0,	0,	'SysConfig',	'',	''),
(12,	2,	'系统菜单',	'icons icon_sys_menu',	0,	0,	0,	'SysMenus',	'',	''),
(13,	2,	'系统角色',	'icons icon_sys_role',	0,	0,	0,	'SysRole',	'',	''),
(14,	3,	'Demo',	'icons icon_app',	0,	0,	0,	'Demo',	'',	'');

DROP TABLE IF EXISTS `sys_perm`;
CREATE TABLE `sys_perm` (
  `uid` bigint(19) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `sys_perm` (`uid`, `utime`, `role`, `perm`) VALUES
(1,	0,	'',	'1:0 2:0 3:0 4:0 5:7 6:3 7:63 8:31 9:0 10:0 11:0 12:0 13:0 14:0'),
(2,	0,	'1',	'');

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统角色';

INSERT INTO `sys_role` (`id`, `role`, `ctime`, `utime`, `perm`) VALUES
(1,	'基础权限',	0,	0,	'1:0 3:0 4:0 5:7 6:3 14:0');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(19) unsigned NOT NULL COMMENT 'ID',
  `uname` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `rtime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '注册时间',
  `ltime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '登录时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户帐号';

INSERT INTO `user` (`id`, `uname`, `tel`, `email`, `password`, `rtime`, `ltime`, `utime`, `state`) VALUES
(1,	'admin',	'',	'',	'e10adc3949ba59abbe56e057f20f883e',	0,	0,	0,	'1'),
(2,	'',	'15000000000',	'',	'e10adc3949ba59abbe56e057f20f883e',	0,	0,	0,	'1');

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `uid` bigint(19) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `nickname` varchar(8) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(8) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(8) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息';

INSERT INTO `user_info` (`uid`, `utime`, `nickname`, `position`, `name`, `gender`, `birthday`, `img`) VALUES
(1,	0,	'WebMIS',	'系统开发',	'管理员',	'男',	0,	''),
(2,	0,	'User',	'测试',	'会员',	'男',	0,	'');

DROP TABLE IF EXISTS `user_msg`;
CREATE TABLE `user_msg` (
  `id` bigint(19) unsigned NOT NULL COMMENT 'ID',
  `type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0消息,1其他',
  `uid` varchar(18) NOT NULL DEFAULT '0' COMMENT 'UID',
  `fid` varchar(16) NOT NULL DEFAULT '0' COMMENT '发送者ID',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '发布时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
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
  `ctime` int(10) unsigned NOT NULL DEFAULT 0,
  `utime` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2020-06-09 01:54:55
