import pymysql

# 数据库
class Db :
  Driver = pymysql                                     #驱动
  Host: str = '127.0.0.1'                              #主机
  Port: int = 3306                                     #端口
  User: str = 'webmis'                                 #账号
  Password: str = 'e4b99adec618e653400966be536c45f8'   #密码
  Database: str = 'data'                               #数据库名
  Charset: str = 'utf8mb4'                             #编码
  Min: int = 20                                        #空闲连接数
  Max: int = 30                                        #最大连接数