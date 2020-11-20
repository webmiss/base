import re
import pymysql
from app.Env import Env
from app.common.Base import Base
from dbutils.pooled_db import PooledDB

# 数据库
class Model(Base) :

  __conn = None #链接
  __rollback = False  #回滚
  __cs = None #游标
  __id = 'id'  #主键
  __idVal = 0 #自增ID
  __table = '' #数据表
  __columns = '*' #字段
  __where = ''  #条件
  __group = '' #分组
  __order = '' #排序
  __limit = '' #限制
  __sql = '' #单条SQL
  __fields = {} #字段&数据
  __sql_reg = r"(?:')|(?:--)|(/\*(?:.|[\n\r])*?\*/)|(\b(select|select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\b)"

  # 链接
  def __connect(self,type='pool') :
    cfg = Env.db()
    if type=='pool' :
      pool = PooledDB(**cfg)
      return pool.connection()
    else :
      return pymysql.Connect(
        host=cfg['host'],
        port=cfg['port'],
        user=cfg['user'],
        passwd=cfg['password'],
        db=cfg['db'],
        charset=cfg['charset'],
      )

  # 设置主键
  def setPrimaryKey(self,name) : self.__id=name
  # 设置数据表
  def setSource(self,name) : self.__table=name

  # 返回SQL
  def getSql(self): return self.__sql

  # 查询-单条
  def findFirst(self):
    self.__limit = '0,1'
    self.__getSelect()  #生成SQL
    # 执行
    res = self.executeQuery(self.__sql)
    data = {}
    if res['state'] : data=res['list'][0]
    return data
  # 查询-多条
  def find(self):
    self.__getSelect()  #生成SQL
    # 执行
    res = self.executeQuery(self.__sql)
    data = {}
    if res['state'] : data=res['list']
    return data
  # 统计条数
  def count(self):
    sql = 'SELECT count(*) as total FROM %s'%(self.__table)
    if self.__where!='' : sql += " WHERE "+self.__where
    # 执行
    res = self.executeQuery(sql)
    total = 0
    if res['state'] : total=res['list'][0]['total']
    return total
  # 查询-生成
  def __getSelect(self):
    sql = 'SELECT %s FROM %s'%(self.__columns, self.__table)
    if self.__where!='' : sql += " WHERE "+self.__where
    if self.__group!="" : sql += " GROUP BY "+self.__group
    if self.__order!="" : sql += " ORDER BY "+self.__order
    if self.__limit!="" : sql += " LIMIT "+self.__limit
    self.__sql = sql

  # 新增
  def create(self):
    self.__sql = '' #默认SQL
    self.__callback('beforeCreate') #回调函数
    self.__getAllFields()  #全部字段
    # 组合
    keys = self.__fields.keys()
    vals = ''
    for k in keys :
      if k==self.__id and (self.__fields[k]==None or self.__fields[k]=='null') : vals += 'null,'
      else : vals += '%s,'%self.__fields[k] if (self.__fields[k]==None or self.__fields[k]=='null') else '"%s",'%self.filter(self.__fields[k])
    self.__sql = 'INSERT INTO `%s`(`%s`) values(%s)'%(self.__table,'`,`'.join(keys),vals[:-1])
    # 执行
    res = self.executeQuery(self.__sql)
    return True if res['state'] else False
  # 获取自增ID
  def getLastID(self):
    return self.__idVal

  # 更新
  def update(self):
    self.__sql = '' #默认SQL
    self.__callback('beforeUpdate') #回调函数
    self.__getAllFields()  #全部字段
    # 组合
    keys = self.__fields.keys()
    vals = ''
    for k in keys:
      vals += '%s=%s,'%(k,'null') if self.__fields[k]==None or self.__fields[k]=='null' else '%s="%s",'%(k,self.filter(self.__fields[k]))
    self.__sql = 'UPDATE `%s` SET %s WHERE %s'%(self.__table,vals[:-1], self.__where)
    # 执行
    res = self.executeQuery(self.__sql)
    return True if res['state'] else False

  # 删除
  def delete(self):
    self.__sql = '' #默认SQL
    self.__callback('beforeDelete') #回调函数
    self.__sql = 'DELETE FROM `%s` WHERE %s'%(self.__table, self.__where)
    # 执行
    res = self.executeQuery(self.__sql)
    return True if res['state'] else False

  # Where 条件
  def where(self,where,bind={}):
    # 过滤WHERE
    if len(bind)>0 : where=self.bindWhere(where,bind)
    if where=='' : self.error('Where不能为空!')
    self.__where = where
    return self
  # Table 数据表
  def table(self,str=''):
    self.__table = str
    return self
  # Columns 字段
  def columns(self,str='*'):
    self.__columns = str
    return self
  # Group 分组
  def group(self,str=''):
    self.__group = str
    return self
  # Order 排序
  def order(self,str=''):
    self.__order = str
    return self
  # Limit 限制
  def limit(self,str=''):
    self.__limit = str
    return self
  # 过滤-SQL
  def filter(self, v=''):
    return re.sub(r'.*([\';]+|(--)+).*','',str(v))
  # 过滤-WHERE
  def bindWhere(self,where,bind):
    for k in bind.keys() :
      v = str(bind[k])
      # 小写、匹配、替换
      lower = v.lower()
      if re.search(self.__sql_reg,lower) :
        print('SQL过滤: '+v)
        return ''
      where = re.sub(r':'+k+':', v, where)
    return where

  # 事务-回滚
  def begin(self):
    Model.__rollback = True
  def commit(self):
    Model.__rollback = False
    if Model.__conn!=None :
      Model.__conn.commit()
      Model.__conn.close()
      Model.__conn = None

  # 执行SQL
  def executeQuery(self,sql,bind={}):
    __conn = None
    __cs = None
    res = {}
    # 过滤SQL
    if len(bind)>0 : sql=self.bindWhere(sql,bind)
    try:
      # 回滚
      if Model.__rollback :
        if Model.__conn==None : Model.__conn = __conn = self.__connect('rollback')
        else : __conn = Model.__conn
      else : __conn = self.__connect()
      # 类型
      type = sql[0:1].lower()
      if type=='s' :
        # 查询
        __cs = __conn.cursor(cursor=pymysql.cursors.DictCursor)
        num = __cs.execute(sql)
        list = __cs.fetchall()
        list = {} if list==None else list
        res = {'state':True if num>0 else False,'num':num,'list':list}
      else :
        __cs = __conn.cursor()
        num = __cs.execute(sql)
        res = {'state':True,'num':num}
        if type=='i' :
          self.__idVal = __cs.lastrowid
          res['id'] = self.__idVal
        # 提交
        if not Model.__rollback : __conn.commit()
    except Exception as e:
      if Model.__rollback and __conn!=None : __conn.rollback()
      print("执行失败: ",e)
      print(sql)
      res = {'state':False,'msg':e}
    finally :
      # 关闭
      if __cs!=None : __cs.close()
      # 关闭链接
      if not Model.__rollback and __conn!=None : __conn.close()
    return res

  # 验证&取值
  def __getAllFields(self):
    self.__fields = {}
    methods = dir(self)
    fields = self.__setFields()
    for name in fields.keys():
      mName = name.capitalize()
      val = fields[name]
      val = '"%s"'%str(val) if type(val)==str else str(val)
      # 设置
      if 'set'+mName in methods: exec('self.set'+mName+'('+val+')')
      # 获取
      if 'get'+mName in methods: self.__fields[name]=eval('self.get'+mName+'()')
      else : self.__fields[name] = fields[name]
  # 获取-字段&值
  def __setFields(self) :
    arr = self.__dict__
    fields = {}
    for key in arr.keys():
      if key[1] != 'M': fields[key]=arr[key]
    return fields
  # 回调函数
  def __callback(self,name):
    methods = dir(self)
    if name in methods : self.__fields=eval('self.'+name+'()')
