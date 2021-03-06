import pymysql
from dbutils.pooled_db import PooledDB
from base.base import Base
from config.db import Db

# 数据库
class Model(Base) :

  __conn = None          #连接
  __sql: str = ''        #SQL
  __table: str = ''      #数据表
  __columns: str = ''    #字段
  __where: str = ''      #条件
  __group: str = ''      #分组
  __order: str = ''      #排序
  __limit: str = ''      #限制
  __args: list = []      #参数
  __keys: str = ''       #新增-名
  __values: str = ''     #新增-值
  __data: str = ''       #更新-数据


  # 链接数据库
  def Conn(self, pool=True) :
    cfg = {
      'host': Db.Host,
      'port': Db.Port,
      'user': Db.User,
      'db': Db.Database,
      'charset': Db.Charset,
    }
    if pool :
      cfg['password'] = Db.Password
      # 数据池
      cfg['mincached'] = Db.Min
      cfg['maxcached'] = Db.Max
      cfg['maxconnections'] = Db.Max
      cfg['blocking'] = True  #是否阻塞等待
      cfg['maxusage'] = True  #重复使用次数
      pool = PooledDB(creator=Db.Driver, **cfg)
      self.__conn = pool.connection()
    else :
      cfg['passwd'] = Db.Password
      self.__conn = pymysql.Connect(**cfg)
    return self.__conn

  # 表
  def Table(self, table: str) :
    self.__table = table
    return self

  # 查询-多条
  def Find(self) :
    self.Conn()
    print(self.__conn)
  