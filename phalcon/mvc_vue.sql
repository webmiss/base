-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-11-07 13:47:11
-- 服务器版本： 10.4.8-MariaDB
-- PHP 版本： 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `mvc_vue`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_config`
--

CREATE TABLE `sys_config` (
  `id` tinyint(2) UNSIGNED NOT NULL COMMENT 'ID',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(128) NOT NULL DEFAULT '' COMMENT '参数值',
  `utime` datetime DEFAULT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置';

--
-- 转存表中的数据 `sys_config`
--

INSERT INTO `sys_config` (`id`, `title`, `name`, `val`, `utime`) VALUES
(1, 'LOGO', 'logo', 'upload/admin/logo201907011221423386.jpg', NULL),
(2, '系统名称', 'title', '测试系统', NULL),
(3, '网站域名', 'http', 'xxx.com', NULL),
(4, '版权信息', 'copy', '2019 xxx.com MIT license', NULL),
(5, '登录背景', 'login_bg', 'upload/admin/bg201907011002287127.jpg', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `sys_menus`
--

CREATE TABLE `sys_menus` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `fid` tinyint(3) UNSIGNED NOT NULL COMMENT '父ID',
  `title` varchar(12) NOT NULL COMMENT '标题',
  `url` varchar(32) DEFAULT '' COMMENT '地址',
  `perm` int(6) UNSIGNED DEFAULT 0 COMMENT '预设权限',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `sort` tinyint(3) UNSIGNED DEFAULT 0 COMMENT '排序',
  `remark` varchar(32) DEFAULT '' COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单';

--
-- 转存表中的数据 `sys_menus`
--

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `url`, `perm`, `ico`, `ctime`, `utime`, `sort`, `remark`) VALUES
(1, 0, '首页', '', 0, 'ico_mask ico_home', '2018-12-15 00:00:00', NULL, 0, ''),
(2, 0, '设置', '', 0, 'ico_mask ico_system', '2018-12-15 00:00:00', NULL, 0, ''),
(3, 1, '控制台', '/', 1, '', '2018-12-15 00:00:00', NULL, 0, ''),
(4, 1, '我的消息', 'WebMsg', 19, 'ico_mask ico_msg', '2018-12-15 00:00:00', NULL, 0, ''),
(5, 2, '用户管理', 'SysUser', 31, 'ico_mask ico_user', '2018-12-15 00:00:00', NULL, 0, ''),
(6, 2, '角色权限', 'SysRole', 31, 'ico_mask ico_role', '2018-12-15 00:00:00', NULL, 0, ''),
(7, 0, '平台', '', 0, 'ico_mask ico_platform', '2018-12-15 00:00:00', NULL, 0, ''),
(8, 2, '基本配置', 'SysConfig', 1, 'ico_mask ico_config', '2018-12-15 00:00:00', '2019-06-25 12:53:50', 0, ''),
(9, 2, '菜单管理', 'SysMenus', 31, 'ico_mask ico_menu', '2018-12-15 00:00:00', NULL, 0, ''),
(10, 2, '菜单动作', 'SysMenusAction', 31, 'ico_mask ico_action', '2019-01-27 11:28:31', NULL, 0, ''),
(11, 1, '基本资料', 'UserInfo', 1, 'ico_mask ico_userinfo', '2019-01-27 11:29:09', NULL, 0, ''),
(12, 1, '修改密码', 'UserPasswd', 1, 'ico_mask ico_passwd', '2019-01-27 11:31:10', '2019-06-29 18:21:32', 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `sys_menus_action`
--

CREATE TABLE `sys_menus_action` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '名称',
  `action` varchar(16) NOT NULL COMMENT '动作',
  `perm` enum('1','2','4','8','16','32','64','128','256','512','1024','2048') NOT NULL COMMENT '权限值',
  `ico` varchar(32) DEFAULT NULL COMMENT '图标样式'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='动作菜单';

--
-- 转存表中的数据 `sys_menus_action`
--

INSERT INTO `sys_menus_action` (`id`, `name`, `action`, `perm`, `ico`) VALUES
(1, '全部', 'list', '1', 'el-icon-refresh'),
(2, '搜索', 'sea', '2', 'el-icon-search'),
(3, '添加', 'add', '4', 'el-icon-plus'),
(4, '编辑', 'edit', '8', 'el-icon-edit'),
(5, '删除', 'del', '16', 'el-icon-delete'),
(6, '打印', 'print', '32', 'el-icon-printer'),
(7, '导出', 'exp', '64', 'el-icon-d-arrow-right'),
(8, '导入', 'imp', '128', 'el-icon-d-arrow-left'),
(9, '图表', 'chart', '256', 'el-icon-picture');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `uname` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `rtime` datetime DEFAULT NULL COMMENT '注册时间',
  `ltime` datetime DEFAULT NULL COMMENT '登录时间',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  `state_admin` enum('0','1') NOT NULL DEFAULT '0' COMMENT '后台登录',
  `state_app` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'APP登录'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户帐号';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `uname`, `tel`, `email`, `password`, `rtime`, `ltime`, `utime`, `state`, `state_admin`, `state_app`) VALUES
(1, 'admin', '', 'klingsoul@163.com', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-15 00:00:00', '2019-11-05 18:21:35', '2019-07-01 10:50:30', '1', '1', '0'),
(2, 'test1', '', '', 'e10adc3949ba59abbe56e057f20f883e', '2019-06-27 09:06:09', '2019-06-27 09:17:18', NULL, '1', '0', '1');

-- --------------------------------------------------------

--
-- 表的结构 `user_info`
--

CREATE TABLE `user_info` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `uid` int(10) UNSIGNED NOT NULL COMMENT 'uid',
  `nickname` varchar(6) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(12) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(12) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`id`, `uid`, `nickname`, `position`, `name`, `gender`, `birthday`, `img`) VALUES
(1, 1, '', '', '', '', NULL, 'upload/user/img/201907021631382432.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user_perm`
--

CREATE TABLE `user_perm` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `uid` int(10) UNSIGNED NOT NULL COMMENT 'uid',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '专属权限',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色权限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

--
-- 转存表中的数据 `user_perm`
--

INSERT INTO `user_perm` (`id`, `uid`, `utime`, `perm`, `role`) VALUES
(1, 1, NULL, '1:0 2:0 3:1 4:19 5:31 6:31 8:1 9:31 10:31 11:1 12:1', '0'),
(2, 2, NULL, '', '0');

-- --------------------------------------------------------

--
-- 表的结构 `user_role`
--

CREATE TABLE `user_role` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `role` varchar(6) NOT NULL DEFAULT '' COMMENT '角色名称',
  `utime` datetime DEFAULT NULL COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限';

--
-- 转存表中的数据 `user_role`
--

INSERT INTO `user_role` (`id`, `role`, `utime`, `perm`) VALUES
(1, '普通用户', NULL, '1:0 3:1 4:19 11:1 12:1');

-- --------------------------------------------------------

--
-- 表的结构 `web_msg`
--

CREATE TABLE `web_msg` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `uid` varchar(10) NOT NULL COMMENT 'UID',
  `is_new` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0新，1阅读',
  `ctime` datetime DEFAULT NULL COMMENT '发布时间',
  `title` varchar(16) NOT NULL COMMENT '标题',
  `content` varchar(300) NOT NULL COMMENT '内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';

--
-- 转存表中的数据 `web_msg`
--

INSERT INTO `web_msg` (`id`, `uid`, `is_new`, `ctime`, `title`, `content`) VALUES
(1, '1', '1', '2019-11-07 10:30:00', '测试消息', '测试消息内容');

--
-- 转储表的索引
--

--
-- 表的索引 `sys_config`
--
ALTER TABLE `sys_config`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_menus`
--
ALTER TABLE `sys_menus`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_menus_action`
--
ALTER TABLE `sys_menus_action`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user_perm`
--
ALTER TABLE `user_perm`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `web_msg`
--
ALTER TABLE `web_msg`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_config`
--
ALTER TABLE `sys_config`
  MODIFY `id` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `sys_menus`
--
ALTER TABLE `sys_menus`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `sys_menus_action`
--
ALTER TABLE `sys_menus_action`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user_perm`
--
ALTER TABLE `user_perm`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `web_msg`
--
ALTER TABLE `web_msg`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
