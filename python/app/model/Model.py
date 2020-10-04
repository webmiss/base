from app.Env import Env
from dbutils.pooled_db import PooledDB
import pymysql

# 数据库
class Model(object) :

  # 查询-但条
  def fetchOne(self,sql,params=[]):
    print(self.table)
    conn, cursor = self.connect()
    cursor.execute(sql, params)
    res = cursor.fetchone()
    self.close(conn, cursor)
    return res

  # 查询-全部
  def fetchAll(self,sql,params=[]):
    conn, cursor = self.connect()
    cursor.execute(sql, params)
    res = cursor.fetchall()
    self.close(conn, cursor)
    return res

  # 事务
  def commit(self,sql,params=[]):
    conn, cursor = self.connect()
    cursor.execute(sql, params)
    conn.commit()
    self.close(conn, cursor)

  # 链接
  def connect(self):
    pool = PooledDB(**Env.db(self))
    conn = pool.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    return conn,cursor

  # 关闭
  def close(self,conn,cursor):
    cursor.close()
    conn.close()
