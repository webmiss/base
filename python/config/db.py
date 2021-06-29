import pymysql

# 数据库配置
class Db :

  # 默认
  def Default() :
    return {
      'creator': pymysql,                                 #驱动
      'host': '127.0.0.1',                                #主机
      'port': 3306,                                       #端口
      'user': 'webmis',                                   #账号
      'password': 'e4b99adec618e653400966be536c45f8',     #密码
      'db': 'data',                                       #数据库名
      'mincached': 5,                                     #初始连接数
      'maxcached': 10,                                    #最大连接数
      'maxconnections': 10,                               #最大连接数
      'blocking': True,                                   #是否阻塞等待
      'maxusage': True,                                   #重复使用次数
    }

  # 其它
  def Other() :
    return {
      'creator': pymysql,                                 #驱动
      'host': '127.0.0.1',                                #主机
      'port': 3306,                                       #端口
      'user': 'webmis',                                   #账号
      'password': 'e4b99adec618e653400966be536c45f8',     #密码
      'db': 'data',                                       #数据库名
      'mincached': 5,                                     #初始连接数
      'maxcached': 200,                                   #最大连接数
      'maxconnections': 200,                              #最大连接数
      'blocking': True,                                   #是否阻塞等待
      'maxusage': True,                                   #重复使用次数
    }
