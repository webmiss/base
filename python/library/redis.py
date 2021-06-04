import redis
from service.base import Base
from config.redis import Redis as Cfg

# 缓存数据库
class Redis(Base):

  RedisDB = None        #默认池
  RedisDBOther = None   #其它池

  __db = ''             #数据库
  __conn = None         #连接

  # 构造函数
  def __init__(self, db: str=''):
    self.__db = db
    self.RedisConn()

  # 连接
  def RedisConn(self):
    try:
      if self.__db=='other' :
        if not Redis.RedisDBOther : Redis.RedisDBOther=self.RedisPool(Cfg.Other())
        self.__conn = redis.StrictRedis(connection_pool=self.RedisDBOther)
      else :
        if not Redis.RedisDB : Redis.RedisDB=self.RedisPool(Cfg.Default())
        self.__conn = redis.StrictRedis(connection_pool=self.RedisDB)
      return self.__conn
    except Exception as e:
      self.Print('[Redis] Conn:', e)
      return None

  # 关闭
  def Close(self) :
    if not self.__conn : self.__conn.close()

  # 连接池
  def RedisPool(self, cfg: dict):
    try:
      return redis.ConnectionPool(
        host=cfg['host'],
        port=cfg['port'],
        password=cfg['password'],
        db=cfg['db'],
        decode_responses=True,
        max_connections=cfg['max'],
      )
    except Exception as e:
      self.Print('[Redis] Pool:', e)
      return None

  # 添加
  def Set(self, key: str, val: str):
    try:
      res = self.__conn.set(key, val)
      if not res : return False
      return res
    except Exception as e:
      self.Print('[Redis] Set:', e)
      return False
  # 自增
  def Incr(self, key: str):
    try:
      res = self.__conn.incr(key)
      if not res : return False
      return res
    except Exception as e:
      self.Print('[Redis] Incr:', e)
      return False
  # 获取
  def Get(self, key: str):
    try:
      res = self.__conn.get(key)
      if not res : return b''
      return res
    except Exception as e:
      self.Print('[Redis] Get:', e)
      return b''
  # 删除
  def Del(self, *key: str):
    try:
      return self.__conn.delete(key)
    except Exception as e:
      self.Print('[Redis] Del:', e)
      return 0
  # 是否存在
  def Exist(self, key: str):
    try:
      return self.__conn.exists(key)
    except Exception as e:
      self.Print('[Redis] Exist:', e)
      return 0
  # 设置过期时间(秒)
  def Expire(self, key: str, ttl: int):
    try:
      return self.__conn.expire(key, ttl)
    except Exception as e:
      self.Print('[Redis] Expire:', e)
      return False
  # 获取过期时间(秒)
  def Ttl(self, key: str):
    try:
      return self.__conn.ttl(key)
    except Exception as e:
      self.Print('[Redis] Ttl:', e)
      return 0
  # 获取长度
  def StrLen(self, key: str):
    try:
      return self.__conn.strlen(key)
    except Exception as e:
      self.Print('[Redis] StrLen:', e)
      return 0

  # 哈希(Hash)-添加
  def HSet(self, name: str, key, val):
    try:
      return self.__conn.hset(name, key, val)
    except Exception as e:
      self.Print('[Redis] HSet:', e)
      return 0
  def HMSet(self, name: str, obj):
    try:
      return self.__conn.hmset(name, obj)
    except Exception as e:
      self.Print('[Redis] HMSet:', e)
      return False
  # 哈希(Hash)-获取
  def HGet(self, name: str, key):
    try:
      res = self.__conn.hget(name, key)
      if not res : return b''
      return res
    except Exception as e:
      self.Print('[Redis] HGet:', e)
      return b''
  def HMGet(self, name: str, key):
    try:
      return self.__conn.hmget(name, key)
    except Exception as e:
      self.Print('[Redis] HMGet:', e)
      return []
  # 哈希(Hash)-删除
  def HDel(self, name: str, *key):
    try:
      return self.__conn.hdel(name, key)
    except Exception as e:
      self.Print('[Redis] HDel:', e)
      return 0
  # 哈希(Hash)-是否存在
  def HExist(self, name: str, key):
    try:
      return self.__conn.hexists(name, key)
    except Exception as e:
      self.Print('[Redis] HExist:', e)
      return False
  # 哈希(Hash)-Key个数
  def HLen(self, name: str):
    try:
      return self.__conn.hlen(name)
    except Exception as e:
      self.Print('[Redis] HLen:', e)
      return 0

  # 列表(List)-写入
  def RPush(self, key: str, val):
    try:
      return self.__conn.rpush(key, val)
    except Exception as e:
      self.Print('[Redis] RPush:', e)
      return 0
  def LPush(self, key: str, val):
    try:
      return self.__conn.lpush(key, val)
    except Exception as e:
      self.Print('[Redis] LPush:', e)
      return 0
  # 列表(List)-读取
  def LRange(self, key: str, start: int, end: int):
    try:
      res = self.__conn.lrange(key, start, end)
      if not res : return tuple(b'',b'')
      return res
    except Exception as e:
      self.Print('[Redis] lRange:', e)
      return tuple(b'',b'')
  def BRPop(self, key: str, timeout: float):
    try:
      res = self.__conn.brpop(key, timeout)
      if not res : return tuple(b'',b'')
      return res
    except Exception as e:
      self.Print('[Redis] BRPop:', e)
      return tuple(b'',b'')
  def BLPop(self, key: str, timeout: float):
    try:
      res = self.__conn.blpop(key, timeout)
      if not res : return tuple(b'',b'')
      return res
    except Exception as e:
      self.Print('[Redis] BLPop:', e)
      return tuple(b'',b'')
