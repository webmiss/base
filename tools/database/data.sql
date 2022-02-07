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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='API菜单';

INSERT INTO `api_menus` (`id`, `fid`, `title`, `ico`, `ctime`, `utime`, `sort`, `url`, `controller`, `action`) VALUES
(1,	0,	'测试接口',	'',	0,	0,	0,	'',	'/api/demo',	'[{\"name\":\"列表\",\"action\":\"List\",\"perm\":1},{\"name\":\"权限\",\"action\":\"perm\",\"perm\":2}]');

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
  `name` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='API角色';

INSERT INTO `api_role` (`id`, `name`, `ctime`, `utime`, `perm`) VALUES
(1,	'普通会员',	0,	0,	'1:2');

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
(4,	'版权信息',	'copy',	'2021 webmis.vip MIT license',	0,	0),
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
(2,	0,	'内容',	'icons icon_content',	0,	0,	0,	'',	'',	''),
(3,	0,	'系统',	'icons icon_config',	0,	0,	0,	'',	'',	''),
(4,	2,	'新闻',	'',	0,	0,	0,	'',	'',	''),
(5,	3,	'文件',	'',	0,	0,	0,	'',	'',	''),
(6,	3,	'用户',	'',	0,	0,	0,	'',	'',	''),
(7,	3,	'权限',	'',	0,	0,	0,	'',	'',	''),
(8,	3,	'设置',	'',	0,	0,	0,	'',	'',	''),
(9,	4,	'新闻管理',	'',	0,	0,	0,	'/News',	'/admin/news',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"name\":\"删除\",\"action\":\"del\",\"perm\":16}]'),
(10,	4,	'新闻分类',	'',	0,	0,	0,	'/NewsClass',	'/admin/news_class',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"name\":\"删除\",\"action\":\"del\",\"perm\":16}]'),
(11,	5,	'网站目录',	'',	0,	0,	0,	'/SysFileManage',	'/admin/sysfile',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"新建文件夹\",\"action\":\"mkdir\",\"perm\":2},{\"name\":\"重命名\",\"action\":\"rename\",\"perm\":4},{\"name\":\"上传\",\"action\":\"upload\",\"perm\":8},{\"name\":\"下载\",\"action\":\"down\",\"perm\":16},{\"name\":\"删除\",\"action\":\"remove\",\"perm\":32}]'),
(12,	6,	'系统帐户',	'',	0,	0,	0,	'/SysUser',	'/admin/sys_user',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"name\":\"删除\",\"action\":\"del\",\"perm\":16},{\"name\":\"状态\",\"action\":\"state\",\"perm\":32},{\"name\":\"权限\",\"action\":\"perm\",\"perm\":64},{\"name\":\"个人信息\",\"action\":\"info\",\"perm\":128}]'),
(13,	7,	'系统菜单',	'',	0,	0,	0,	'/SysMenus',	'/admin/sys_menus',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"name\":\"删除\",\"action\":\"del\",\"perm\":16},{\"name\":\"权限\",\"action\":\"perm\",\"perm\":32}]'),
(14,	7,	'系统角色',	'',	0,	0,	0,	'/SysRole',	'/admin/sys_role',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"搜索\",\"action\":\"sea\",\"perm\":2},{\"name\":\"添加\",\"action\":\"add\",\"perm\":4},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":8},{\"name\":\"删除\",\"action\":\"del\",\"perm\":16},{\"name\":\"权限\",\"action\":\"perm\",\"perm\":32}]'),
(15,	8,	'系统配置',	'',	0,	0,	0,	'/SysConfig',	'/admin/sys_config',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":2},{\"name\":\"图片\",\"action\":\"upimg\",\"perm\":4}]'),
(16,	8,	'系统帮助',	'',	0,	0,	0,	'/SysHelp',	'/admin/sys_help',	'[{\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"name\":\"编辑\",\"action\":\"edit\",\"perm\":2}]');

DROP TABLE IF EXISTS `sys_perm`;
CREATE TABLE `sys_perm` (
  `uid` bigint(19) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `sys_perm` (`uid`, `utime`, `role`, `perm`) VALUES
(1,	0,	'',	'1:0 2:0 3:0 4:0 5:0 6:0 7:0 8:0 9:31 10:31 11:63 12:255 13:63 14:63 15:7 16:3'),
(2,	0,	'1',	'');

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统角色';

INSERT INTO `sys_role` (`id`, `name`, `ctime`, `utime`, `perm`) VALUES
(1,	'基础权限',	0,	0,	'1:0 2:0 4:0 9:1 10:1');

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

CREATE TABLE IF NOT EXISTS `logs` (
  `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `source` varchar(8) NOT NULL COMMENT '来源',
  `ip` varchar(16) NOT NULL COMMENT 'IP',
  `os` varchar(16) NOT NULL COMMENT 'OS',
  `browser` varchar(16) NOT NULL COMMENT 'Browser',
  `ctime` int(10) unsigned NOT NULL COMMENT '访问时间',
  `method` varchar(8) NOT NULL DEFAULT '' COMMENT '请求类型',
  `url` varchar(256) NOT NULL DEFAULT '' COMMENT '访问地址',
  `user_agent` varchar(512) NOT NULL DEFAULT '' COMMENT '用户信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(16) NOT NULL,
  `ctime` int(10) unsigned NOT NULL DEFAULT 0,
  `utime` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2020-06-09 01:54:55
