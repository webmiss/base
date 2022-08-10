import pymysql
from dbutils.pooled_db import PooledDB
from config.db import Db
from util.util import Util
from util.type import Type

# 数据库
class Model :

  DBDefault = None     #默认池
  DBOther = None       #其它池

  __sql: str=''        #SQL
  __db = ''            #数据库
  __table: str=''      #数据表
  __columns: str=''    #字段
  __where: str=''      #条件
  __group: str=''      #分组
  __order: str=''      #排序
  __limit: str=''      #限制
  __args: tuple=()     #参数
  __keys: str=''       #新增-名
  __values: str=''     #新增-值
  __data: str=''       #更新-数据
  __id: int=0          #自增ID
  __nums: int=0        #条数
  __columnsType={}     #字段类型

  # 连接
  def DBConn(self):
    conn = None
    try :
      if self.__db=='other' :
        if not Model.DBOther : Model.DBOther=self.DBPool(Db.Default())
        conn = self.DBOther.connection()
      else :
        if not Model.DBDefault : Model.DBDefault=self.DBPool(Db.Default())
        conn = self.DBDefault.connection()
    except Exception as e :
      print('[Model] Conn:', e)
    return conn

  # 连接池
  def DBPool(self, cfg: dict):
    try :
      return PooledDB(**cfg)
    except Exception as e :
      print('[Model] Pool:', e)
      return None

  # 查询
  def Query(self, conn, sql: str, args: tuple) :
    if sql == '' :
      print('[Model] Query: SQL不能为空!')
      return None
    # 游标
    try :
      cs = conn.cursor(cursor=pymysql.cursors.DictCursor)
      self.__nums = cs.execute(sql, args)
      return cs
    except Exception as e :
      print('[Model] Query:', e)
      print('[Model] SQL:', sql)
      return None
  
  # 执行
  def Exec(self, conn, sql: str, args: tuple) :
    if sql == '' :
      print('[Model] Exec: SQL不能为空!')
      return None
    # 游标
    try :
      cs = conn.cursor()
      self.__nums = cs.execute(sql, args)
      conn.commit()
      return cs
    except Exception as e :
      print('[Model] Exec:', e)
      print('[Model] SQL:', sql)
      return None

  # 获取-SQL
  def GetSql(self):
    return self.__sql
  # 获取-自增ID
  def GetID(self):
    return self.__id
  # 获取-条数
  def GetNums(self):
    return self.__nums

  # 数据库
  def Db(self, db: str) :
    self.__db = db
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
  # 字段-返回类型
  def ResType(self, type: dict) :
    self.__columnsType = type
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
  def SelectSQL(self) :
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
    if self.__group != '' :
      self.__sql += ' GROUP BY '+self.__group
      self.__group = ''
    if self.__order != '' :
      self.__sql += ' ORDER BY '+self.__order
      self.__order = ''
    if self.__limit != '' :
      self.__sql += ' LIMIT '+self.__limit
      self.__limit = ''
    args = self.__args
    self.__args = ()
    return self.__sql,args
  # 查询-多条
  def Find(self) :
    res = []
    sql, args = self.SelectSQL()
    conn = self.DBConn()
    cs = self.Query(conn, sql, args)
    if not cs : return res
    data = cs.fetchall()
    cs.close()
    # 转换类型
    for v1 in data :
      for k2,v2 in v1.items():
        if k2 in self.__columnsType.keys():
          v1[k2] = Type.ToType(k2, v2)
        else:
          v1[k2] = str(v2)
    self.__columnsType = {}
    conn.close()
    return data
  #查询-单条
  def FindFirst(self) :
    res = {}
    sql, args = self.SelectSQL()
    conn = self.DBConn()
    cs = self.Query(conn, sql, args)
    if not cs : return res
    data = cs.fetchone()
    if not data : return res
    cs.close()
    # 转换类型
    for k,v in data.items() :
      if k in self.__columnsType.keys():
        data[k] = Type.ToType(k, v)
      else:
        data[k] = str(v)
    self.__columnsType = {}
    conn.close()
    return data

  # 添加-单条
  def Values(self, data: dict) :
    keys, vals = [], []
    self.__args = ()
    for k,v in data.items() :
      keys += [k]
      vals += ['%s']
      self.__args += (v,)
    self.__keys = Util.Implode(', ', keys)
    self.__values = '(' + Util.Implode(', ', vals) + ')'
  # 添加-多条
  def ValuesAll(self, data: list) :
    keys, vals, alls = [], [], []
    self.__args = ()
    for k,v in data[0].items() :
      keys += [k]
      vals += ['%s']
    for i in range(len(data)):
      for k in keys :
        self.__args += (data[i][k],)
      alls += ['(' + Util.Implode(', ', vals) + ')']
    self.__keys = Util.Implode(', ', keys)
    self.__values = Util.Implode(', ', alls)
  # 添加-SQL
  def InsertSQL(self) :
    if self.__table=='' :
      print('Model[Insert]: 表不能为空!')
      return '', None
    if self.__keys=='' or self.__values=='' :
      print('Model[Insert]: 数据不能为空!')
      return '', None
    self.__sql = 'INSERT INTO `' + self.__table + '`(' + self.__keys + ') VALUES ' + self.__values
    # 重置
    self.__keys = ''
    self.__values = ''
    args = self.__args
    self.__args = ()
    return self.__sql, args
  # 添加-执行
  def Insert(self) :
    sql, args = self.InsertSQL()
    conn = self.DBConn()
    cs = self.Exec(conn, sql, args)
    if cs==None : return False
    self.__id = cs.lastrowid
    cs.close()
    conn.close()
    return True
  # 添加-自增ID
  def LastInsertId(self, cs: any) :
    return cs.lastrowid

  # 更新-数据
  def Set(self, data: dict) :
    vals = ''
    self.__args = ()
    for k,v in data.items() :
      vals += k + '=%s, '
      self.__args += (v,)
    self.__data = vals[:-2] if len(vals)>0 else ''
  # 更新-SQL
  def UpdateSQL(self) :
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
    sql, args = self.UpdateSQL()
    conn = self.DBConn()
    cs = self.Exec(conn, sql, args)
    if cs == None : return False
    cs.close()
    conn.close()
    return True

  # 删除-SQL
  def DeleteSQL(self) :
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
    sql, args = self.DeleteSQL()
    conn = self.DBConn()
    cs = self.Exec(conn, sql, args)
    if cs == None : return False
    cs.close()
    conn.close()
    return True
    
