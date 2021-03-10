import pymysql

# 数据库
class Db :
  driver = pymysql                                     #驱动
  host: str = '127.0.0.1'                              #主机
  port: int = 3306                                     #端口
  user: str = 'webmis'                                 #账号
  password: str = 'e4b99adec618e653400966be536c45f8'   #密码
  database: str = 'data'                               #数据库名
  charset: str = 'utf8mb4'                             #编码
  min: int = 20                                        #空闲连接数
  max: int = 30                                        #最大连接数