import pymysql
from dbutils.pooled_db import PooledDB
from config.db import Db

# 数据库
class Model :

  DBDefault = None            #默认数据库
  DBOther = None              #其他数据库

  __conn = None               #连接
  __sql: str = ''             #SQL
  __db: str = ''              #数据库
  __table: str = ''           #数据表
  __columns: str = ''         #字段
  __where: str = ''           #条件
  __group: str = ''           #分组
  __order: str = ''           #排序
  __limit: str = ''           #限制
  __args: tuple = ()          #参数
  __keys: str = ''            #新增-名
  __values: str = ''          #新增-值
  __data: str = ''            #更新-数据

  # 构造函数
  def __init__(self, db: str=''):
    if db=="other" : self.__conn = self.DBOther.connection()
    else : self.__conn = self.DBDefault.connection()

  # 数据池
  def DBPool(self, db: str=''):
    if db=="other" : cfg = Db.Default()
    else : cfg = Db.Default()
    try :
      if db=="other" : self.DBOther = PooledDB(**cfg)
      else : self.DBDefault = PooledDB(**cfg)
    except Exception as e :
      print('[Model] Pool:', e)

  # 链接
  def Conn(self):
    return self.__conn

  # 查询
  def Query(self, sql: str, args: tuple = ()) :
    if sql == '' :
      print('[Model] Query: SQL不能为空!')
      return None, 0
    # 连接
    if not self.__conn : return None, 0
    # 游标
    try :
      cs = self.__conn.cursor(cursor=pymysql.cursors.DictCursor)
      num = cs.execute(sql, args)
      return cs, num
    except Exception as e :
      print('[Model] Query:', e)
      print('[Model] SQL:', sql)
      return None, 0
  
  # 执行
  def Exec(self, sql: str, args: tuple = ()) :
    if sql == '' :
      print('[Model] Exec: SQL不能为空!')
      return None, 0
    # 连接
    if not self.__conn : return None, 0
    # 游标
    try :
      cs = self.__conn.cursor()
      num = cs.execute(sql, args)
      self.__conn.commit()
      return cs, num
    except Exception as e :
      print('[Model] Exec:', e)
      print('[Model] SQL:', sql)
      return None, 0

  # 获取-SQL
  def GetSql(self):
    return self.__sql

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
    if self.__table=='' :
      print('[Model] Select: 表不能为空!')
      return '', ()
    if self.__columns=='' :
      print('[Model] Select: 字段不能为空!')
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
    res = []
    sql, args = self.SelectSql()
    if(sql=='') : return res
    cs, num = self.Query(sql, args)
    if not cs : return res
    res = cs.fetchall()
    cs.close()
    return res
  #查询-单条
  def FindFirst(self) :
    res = {}
    sql, args = self.SelectSql()
    if(sql=='') : return res
    cs, num = self.Query(sql, args)
    if not cs : return res
    res = cs.fetchone()
    cs.close()
    return res

  # 添加-数据
  def Values(self, data: dict = {}) :
    keys, vals = '', ''
    self.__args = ()
    for k,v in data.items() :
      keys += k+', '
      vals += '%s, '
      self.__args += (v,)
    self.__keys = keys[:-2] if len(keys)>0 else ''
    self.__values = vals[:-2] if len(vals)>0 else ''
  # 添加-SQL
  def InsertSql(self) :
    if self.__table=='' :
      print('Model[Insert]: 表不能为空!')
      return '', None
    if self.__keys=='' or self.__values=='' :
      print('Model[Insert]: 数据不能为空!')
      return '', None
    self.__sql = 'INSERT INTO `' + self.__table + '`(' + self.__keys + ') values(' + self.__values + ')'
    # 重置
    self.__keys = ''
    self.__values = ''
    args = self.__args
    self.__args = ()
    return self.__sql, args
  # 添加-执行
  def Insert(self) :
    sql, args = self.InsertSql()
    if(sql=='') : return 0
    cs, num = self.Exec(sql, args)
    if cs == None : return None
    id = cs.lastrowid
    cs.close()
    return id

  # 更新-数据
  def Set(self, data: dict) :
    vals = ''
    self.__args = ()
    for k,v in data.items() :
      vals += k + '=%s, '
      self.__args += (v,)
    self.__data = vals[:-2] if len(vals)>0 else ''
  # 更新-SQL
  def UpdateSql(self) :
    if self.__table=='' :
      print('Model[Update]: 表不能为空!')
      return '', None
    if self.__data=='' :
      print('Model[Update]: 数据不能为空!')
      return '', None
    if self.__where=='' :
      print('Model[Update]: 条件不能为空!')
      return '', None
    self.__sql = 'UPDATE `' + self.__table + '` SET ' + self.__data + ' WHERE ' + self.__where
    args = self.__args
    # 重置
    self.__data = ''
    self.__where = ''
    self.__args = ()
    return self.__sql, args
  # 更新-执行
  def Update(self) :
    sql, args = self.UpdateSql()
    if(sql=='') : return 0
    cs, num = self.Exec(sql, args)
    if cs == None : return None
    cs.close()
    return num

  # 删除-SQL
  def DeleteSql(self) :
    if self.__table=='' :
      print('Model[Delete]: 表不能为空!')
      return '', None
    if self.__where=='' :
      print('Model[Delete]: 条件不能为空!')
      return '', None
    self.__sql = 'DELETE FROM `' + self.__table + '` WHERE ' + self.__where
    args = self.__args
    # 重置
    self.__where = ''
    self.__args = ()
    return self.__sql, args
  # 删除-执行
  def Delete(self) :
    sql, args = self.DeleteSql()
    if(sql=='') : return 0
    cs, num = self.Exec(sql, args)
    if cs == None : return None
    cs.close()
    return num
    
