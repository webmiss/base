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
  __args: tuple = ()      #参数
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
    try :
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
    except Exception as e :
      print('[Model] Conn:', e)
      return None

  # 查询
  def Query(self, sql: str, args: tuple = ()) :
    if sql == '' :
      print('[Model] Query: SQL不能为空!')
      return None
    # 连接
    if self.Conn(False) == None : return None, 0
    # 游标
    cs = self.__conn.cursor(cursor=pymysql.cursors.DictCursor)
    num = cs.execute(sql, *args)
    return cs, num

  # 表
  def Table(self, table: str) :
    self.__table = table
  # 关联-INNER
  def Join(self, table: str, on : str) :
    self.__table += ' INNER JOIN ' + table + ' ON ' + on
  # 关联-LEFT
  def LeftJoin(self, table: str, on : str) :
    self.__table += ' LEFT JOIN ' + table + ' ON ' + on
  # 关联-RIGHT
  def RightJoin(self, table: str, on : str) :
    self.__table += ' RIGHT JOIN ' + table + ' ON ' + on
  # 关联-FULL
  def FullJoin(self, table: str, on : str) :
    self.__table += ' FULL JOIN ' + table + ' ON ' + on
  # 字段
  def Columns(self, *columns) :
    self.__columns = ','.join(columns)
  # 条件
  def Where(self, where: str, *values) :
    self.__where = where
    self.__args += values
  # 排序
  def Limit(self, start: int, limit: int) :
    self.__limit = str(start)+','+str(limit)
  # 排序
  def Order(self, *order) :
    self.__order = ','.join(order)
  # 分组
  def Group(self, *group) :
    self.__group = ','.join(group)

  # 分页
  def Page(self, page: int, limit: int) :
    start = (page - 1) * limit
    self.__limit = str(start) + ',' + str(limit)

  # 查询-SQL
  def SelectSql(self) :
    if self.__table=='' or self.__columns=='' :
      print('Model[Select]: 数据表、字段不能为空!')
      return '', ()
    # 合成
    self.__sql = 'SELECT '+self.__columns+' FROM '+self.__table
    if self.__where != '' :
      self.__sql += ' WHERE '+self.__where
      self.__where = ''
    if self.__order != '' :
      self.__sql += ' ORDER BY '+self.__order
      self.__order = ''
    if self.__group != '' :
      self.__sql += ' GROUP BY '+self.__group
      self.__group = ''
    if self.__limit != '' :
      self.__sql += ' LIMIT '+self.__limit
      self.__limit = ''
    args = self.__args
    self.__args = ()
    return self.__sql,args

  # 查询-多条
  def Find(self) :
    sql, args = self.SelectSql()
    cs, num = self.Query(sql, args)
    res = cs.fetchall()
    cs.close()
    return res

  #查询-单条
  def FindFirst(self) :
    sql, args = self.SelectSql()
    cs, num = self.Query(sql, args)
    if cs == None : return None
    res = cs.fetchone()
    cs.close()
    return res
  