-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: data
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `data`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `data` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `data`;

--
-- Table structure for table `api_menus`
--

DROP TABLE IF EXISTS `api_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='会员菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_menus`
--

LOCK TABLES `api_menus` WRITE;
/*!40000 ALTER TABLE `api_menus` DISABLE KEYS */;
INSERT INTO `api_menus` VALUES (1,0,'测试接口','',0,0,0,'','/api/demo','[{\"name\":\"列表\",\"action\":\"List\",\"ico\":\"icon-list\",\"perm\":1},{\"name\":\"列表\",\"action\":\"perm\",\"ico\":\"icon-list\",\"perm\":2}]');
/*!40000 ALTER TABLE `api_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_perm`
--

DROP TABLE IF EXISTS `api_perm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_perm` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_perm`
--

LOCK TABLES `api_perm` WRITE;
/*!40000 ALTER TABLE `api_perm` DISABLE KEYS */;
INSERT INTO `api_perm` VALUES (2,0,'1','');
/*!40000 ALTER TABLE `api_perm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_role`
--

DROP TABLE IF EXISTS `api_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_role` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='会员角色';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_role`
--

LOCK TABLES `api_role` WRITE;
/*!40000 ALTER TABLE `api_role` DISABLE KEYS */;
INSERT INTO `api_role` VALUES (1,'会员权限',0,0,'1:2');
/*!40000 ALTER TABLE `api_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_config`
--

DROP TABLE IF EXISTS `sys_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_config` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(16) NOT NULL DEFAULT '' COMMENT '标题',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称',
  `val` varchar(128) NOT NULL DEFAULT '' COMMENT '参数值',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='系统配置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_config`
--

LOCK TABLES `sys_config` WRITE;
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
INSERT INTO `sys_config` VALUES (1,'LOGO','logo','',0,0),(2,'系统名称','title','数据中心',0,0),(3,'网站域名','http','webmis.vip',0,0),(4,'版权信息','copy','2020 webmis.vip MIT license',0,0),(5,'登录背景','login_bg','',0,0);
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menus`
--

DROP TABLE IF EXISTS `sys_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `action` tinytext DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menus`
--

LOCK TABLES `sys_menus` WRITE;
/*!40000 ALTER TABLE `sys_menus` DISABLE KEYS */;
INSERT INTO `sys_menus` VALUES (1,0,'首页','icons icon_home',0,0,0,'','',''),(2,0,'设置','icons icon_system',0,0,0,'','',''),(3,0,'业务','icons icon_menu',0,0,0,'','',''),(4,1,'控制台','icons icon_dasktop',0,0,0,'/','',''),(5,1,'个人资料','icons icon_user_info',0,0,0,'UserInfo','/admin/userinfo','[{\"type\":\"2\",\"name\":\"列表\",\"action\":\"list\",\"perm\":1},{\"type\":\"2\",\"name\":\"编辑\",\"action\":\"edit\",\"perm\":2},{\"type\":\"2\",\"name\":\"头像\",\"action\":\"upimg\",\"perm\":4}]'),(6,1,'修改密码','icons icon_user_passwd',0,0,0,'UserPasswd','',''),(7,2,'文件目录','icons icon_sys_folder',0,0,0,'SysFileManage','',''),(8,2,'用户管理','icons icon_sys_user',0,0,0,'SysUser','/admin/user',''),(9,2,'会员菜单','icons icon_sys_menu',0,0,0,'ApiMenus','',''),(10,2,'会员角色','icons icon_sys_role',0,0,0,'ApiRole','',''),(11,2,'系统配置','icons icon_sys_config',0,0,0,'SysConfig','',''),(12,2,'系统菜单','icons icon_sys_menu',0,0,0,'SysMenus','',''),(13,2,'系统角色','icons icon_sys_role',0,0,0,'SysRole','',''),(14,3,'Demo','icons icon_app',0,0,0,'Demo','','');
/*!40000 ALTER TABLE `sys_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_perm`
--

DROP TABLE IF EXISTS `sys_perm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_perm` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `role` varchar(6) DEFAULT '' COMMENT '角色权限',
  `perm` text DEFAULT '' COMMENT '专属权限',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_perm`
--

LOCK TABLES `sys_perm` WRITE;
/*!40000 ALTER TABLE `sys_perm` DISABLE KEYS */;
INSERT INTO `sys_perm` VALUES (1,0,'','1:0 2:0 3:0 4:0 5:7 6:0 7:0 8:0 9:0 10:0 11:0 12:0 13:0 14:0');
/*!40000 ALTER TABLE `sys_perm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role` varchar(16) NOT NULL COMMENT '角色名称',
  `ctime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '创建时间',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `perm` text DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='系统角色';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'基础权限',0,0,'1:0 3:0 4:1 5:1 6:1 14:1');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(16) NOT NULL,
  `ctime` int(10) unsigned NOT NULL DEFAULT 0,
  `utime` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(18) unsigned NOT NULL COMMENT 'ID',
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','','','e10adc3949ba59abbe56e057f20f883e',0,1616499422,0,'1'),(2,'15000000000','','','e10adc3949ba59abbe56e057f20f883e',0,0,0,'1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `uid` bigint(18) unsigned NOT NULL COMMENT 'uid',
  `utime` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '更新时间',
  `nickname` varchar(8) NOT NULL DEFAULT '' COMMENT '昵称',
  `position` varchar(8) NOT NULL DEFAULT '' COMMENT '职位',
  `name` varchar(8) NOT NULL DEFAULT '' COMMENT '姓名',
  `gender` enum('男','女','') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '生日',
  `img` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,0,'WebMIS','系统开发','管理员','男',0,''),(2,0,'User','测试','会员','男',0,'');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_msg`
--

DROP TABLE IF EXISTS `user_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_msg` (
  `id` bigint(18) unsigned NOT NULL COMMENT 'ID',
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_msg`
--

LOCK TABLES `user_msg` WRITE;
/*!40000 ALTER TABLE `user_msg` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_msg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_oauth`
--

DROP TABLE IF EXISTS `user_oauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_oauth` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `client_id` varchar(32) NOT NULL COMMENT '合作者ID',
  `client_secret` varchar(32) NOT NULL COMMENT '密钥',
  `state` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态(1正常,0禁用)',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_oauth`
--

LOCK TABLES `user_oauth` WRITE;
/*!40000 ALTER TABLE `user_oauth` DISABLE KEYS */;
INSERT INTO `user_oauth` VALUES (1,'base@webmis.vip','00fb626bbabfdd903231acf6639cddfb','1','基础系统');
/*!40000 ALTER TABLE `user_oauth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-24  9:34:22
