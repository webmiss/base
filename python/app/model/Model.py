from app.Env import Env
from app.common.Base import Base
from dbutils.pooled_db import PooledDB
import pymysql
import re

# 数据库
class Model(Base) :

  _conn = None  #链接
  _state = False #事务
  _sqlAll = [] #记录SQL
  _sql_reg = r"(?:')|(?:--)|(/\*(?:.|[\n\r])*?\*/)|(\b(select|select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\b)"

  # 链接
  def __init__(self) :
    if self._conn==None :
      pool = PooledDB(**Env.db())
      self._conn = pool.connection()

  # 过滤-SQL
  def filter(self, str=''):
    return re.sub(r'.*([\';]+|(--)+).*','',str)
  # 过滤-WHERE
  def bindWhere(self,where,bind):
    for k in bind.keys() :
      v = str(bind[k])
      # 小写、匹配、替换
      lower = v.lower()
      if re.search(self._sql_reg,lower) :
        print('SQL过滤: '+v)
        return ''
      where = re.sub(r':'+k+':', v, where)
    return where

  # 查询-单条
  def findFirst(self,params={}):
    sql = self._getSql('SELECT',params)
    if sql=='' : return None
    data = self.fetchOne(sql)
    return data

  # 查询-多条
  def find(self,params={}):
    sql = self._getSql('SELECT',params)
    if sql=='' : return None
    data = self.fetchAll(sql)
    return data

  # 新增
  def insert(self,params):
    keys = params.keys()
    vals = ''
    for name in keys :
      vals += '%s,'%params[name] if params[name]=='null' else '"%s",'%self.filter(params[name])
    sql = 'INSERT INTO %s(`%s`) values(%s)'%(self.table,'`,`'.join(keys),vals[:-1])
    # 提交
    if self._state :
      self._sqlAll.append(sql)
    else :
      id = 0
      cs = self._conn.cursor()
      try:
        cs.execute(sql)
        id = cs.lastrowid
        self._conn.commit()
      except:
        self._conn.rollback()
      cs.close()
      self._conn.close()
      return id
      
  # 更新
  def update(self,params,where=''):
    # 是否数据
    if 'data' not in params.keys():
      print('请传入更新数据!')
      return False
    # 是否WHERE
    if 'where' not in params.keys() or params['where']=='' :
      print('必需传入Where条件!')
      return False
    # 过滤WHERE
    where = params['where']
    if 'bind' in params.keys():
      where = self.bindWhere(where,params['bind'])
      if where=='' : return False
    # 组合SQL
    keys = params['data'].keys()
    vals = ''
    for k in keys:
      vals += '%s="%s",'%(k,params['data'][k])
    sql = 'UPDATE `%s` SET %s WHERE %s'%(self.table,vals[:-1],where)
    # 提交
    if self._state :
      self._sqlAll.append(sql)
    else :
      res = False
      cs = self._conn.cursor()
      try:
        cs.execute(sql)
        self._conn.commit()
        res = True
      except:
        self._conn.rollback()
      cs.close()
      self._conn.close()
      return res

  # 删除
  def delete(self,params={}):
    keys = params.keys()
    # 是否WHERE
    if 'where' not in keys or params['where']=='' :
      print('必需传入Where条件!')
      return False
    # 过滤WHERE
    where = params['where']
    if 'bind' in keys :
      where = self.bindWhere(where,params['bind'])
      if where=='' : return False
    # 组合SQL
    sql = 'DELETE FROM `%s` WHERE %s'%(self.table,where)
    # 提交
    if self._state :
      self._sqlAll.append(sql)
    else :
      res = False
      cs = self._conn.cursor()
      try:
        cs.execute(sql)
        self._conn.commit()
        res = True
      except:
        self._conn.rollback()
      cs.close()
      self._conn.close()
      return res

  # 组合SQL
  def _getSql(self,type,params={}):
    keys = params.keys()
    # 参数
    columns = params['columns'] if 'columns' in keys else '*'
    table = params['table'] if 'table' in keys else self.table
    # SQL
    sql = '%s %s FROM %s'%(type,columns,table)
    # Where
    if 'where' in keys :
      # 过滤WHERE
      where = params['where']
      if 'bind' in keys :
        where = self.bindWhere(where,params['bind'])
        if where=='' : return ''
      sql += ' WHERE '+where
    # Group、Order、limit
    if 'group' in params : sql += ' GROUP BY '+params['group']
    if 'order' in params : sql += ' ORDER BY '+params['order']
    if 'limit' in params : sql += ' LIMIT '+params['limit']
    return sql

  # 查询-单条
  def fetchOne(self,sql,params=[]):
    cs = self._conn.cursor(cursor=pymysql.cursors.DictCursor)
    cs.execute(sql, params)
    res = cs.fetchone()
    cs.close()
    self._conn.close()
    return res

  # 查询-全部
  def fetchAll(self,sql,params=[]):
    cs = self._conn.cursor(cursor=pymysql.cursors.DictCursor)
    cs.execute(sql, params)
    res = cs.fetchall()
    cs.close()
    self._conn.close()
    return res

  # 事务
  def begin(self):
    self._state = True
    self._sqlAll = []
  def commit(self):
    self._state = False
    cfg = Env.db()
    _conn = pymysql.Connect(
      host=cfg['host'],
      port=cfg['port'],
      user=cfg['user'],
      passwd=cfg['password'],
      db=cfg['db'],
      charset=cfg['charset'],
    )
    cs = _conn.cursor()
    try:
      for sql in self._sqlAll : cs.execute(sql)
    except Exception as e:
      _conn.rollback()
      print('执行失败:',e)
    else :
      _conn.commit()
    # 关闭
    cs.close()
    _conn.close()

  # 关闭
  def close(self):
    if self._conn!=None : self._conn.close()
