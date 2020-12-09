import os

# 配置
class Env :
  
  debug = True  #调试模式
  devinfo = False  #调试信息
  exclude = ['api','admin','favicon.ico','upload']  #排除路由
  # 资源
  base_url = 'https://demo-python.webmis.vip/' #根目录
  # 加密
  key = 'e4b99adec618e653400966be536c45f8'  #KEY
  # Token
  admin_token_prefix = 'AdminToken_'  #前缀
  admin_token_time = 1*3600  #有效时长
  admin_token_auto = True  #自动续期
  api_token_prefix = 'AdminToken_'  #前缀
  api_token_time = 7*24*3600  #有效时长
  api_token_auto = True  #自动续期
  # Socket
  socket_name = 'Socket_' #缓存名称
  socket_ip = '0.0.0.0' #IP地址
  socket_port = 5001 #端口
  # Cli
  cli = 'cd '+os.path.abspath(os.path.dirname(__file__))+'/../ && python cli.py'

  # 数据库
  def db():
    import pymysql
    # 连接池
    conf = {
      'creator': pymysql,  #数据库模块
      'maxconnections': 5, #最大连接数
      'mincached': 2, #最小空闲连接数
      'maxcached': 5, #最大空闲连接数
      'blocking': True, #是否阻塞等待
      'maxusage': True, #重复使用次数
      # 连接配置
      'host': '121.37.10.103', #主机
      'port': 3306, #端口
      'user': 'webmis', #用户名
      'password': 'e4b99adec618e653400966be536c45f8', #密码
      'db': 'data', #数据库名
      'charset': 'utf8', #编码
    }
    return conf

  # 缓存数据库
  def redis():
    conf = {
      'host': '127.0.0.1',  #主机
      'port': 6379, #端口
      'password': None, #密码
      'db': 0,  #硬盘
      'decode_responses': True
    }
    return conf
