import redis
from service.base import Base
from config.redis import Redis as Cfg

# 缓存数据库
class Redis(Base):

  RedisDB = None
  RedisDBOther = None
  __db = ''
  __conn = None

  # 构造函数
  def __init__(self, db: str=''):
    self.__db = db
    self.RedisConn()

  # 连接池
  def RedisPool(self):
    # 配置
    if self.__db=='Other' : cfg=Cfg.Other
    else : cfg=Cfg.Default()
    # 连接
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

  # 连接
  def RedisConn(self):
    try:
      if self.__db=='Other' :
        if not Redis.RedisDBOther : Redis.RedisDBOther=self.RedisPool()
        self.__conn = redis.StrictRedis(connection_pool=self.RedisDBOther)
      else :
        if not Redis.RedisDB : Redis.RedisDB=self.RedisPool()
        self.__conn = redis.StrictRedis(connection_pool=self.RedisDB)
    except Exception as e:
      self.Print('[Redis] Conn:', e)

  # 实例
  def Conn(self):
    return self.__conn

  # 是否连接
  def IsConn(self):
    if not self.__conn.ping() : self.RedisConn()
  
  # 关闭
  def Close(self) :
    if not self.__conn : self.__conn.close()

  # 添加
  def Set(self, key: str, val: str):
    self.IsConn()
    return self.__conn.set(key, val)
  # 获取
  def Get(self, key: str):
    self.IsConn()
    return self.__conn.get(key)
  # 删除
  def Del(self, *key: str):
    self.IsConn()
    return self.__conn.delete(key)
  # 是否存在
  def Exist(self, key: str):
    self.IsConn()
    return self.__conn.exists(key)
  # 设置过期时间(秒)
  def Expire(self, key: str, ttl: int):
    self.IsConn()
    return self.__conn.expire(key, ttl)
  # 获取过期时间(秒)
  def Ttl(self, key: str):
    self.IsConn()
    return self.__conn.ttl(key)
  # 获取长度
  def StrLen(self, key: str):
    self.IsConn()
    return self.__conn.strlen(key)

  # 哈希(Hash)-添加
  def HSet(self, name: str, key, val):
    self.IsConn()
    return self.__conn.hset(name, key, val)
  def HMSet(self, name: str, obj):
    self.IsConn()
    return self.__conn.hmset(name, obj)
  # 哈希(Hash)-获取
  def HGet(self, name: str, key):
    self.IsConn()
    return self.__conn.hget(name, key)
  def HMGet(self, name: str, key):
    self.IsConn()
    return self.__conn.hmget(name, key)
  # 哈希(Hash)-删除
  def HDel(self, name: str, *key):
    self.IsConn()
    return self.__conn.hdel(name, key)
  # 哈希(Hash)-是否存在
  def HExist(self, name: str, key):
    self.IsConn()
    return self.__conn.hexists(name, key)
  # 哈希(Hash)-Key个数
  def HLen(self, name: str):
    self.IsConn()
    return self.__conn.hlen(name)

  # 列表(List)-写入
  def RPush(self, key: str, val):
    self.IsConn()
    return self.__conn.rpush(key, val)
  def LPush(self, key: str, val):
    self.IsConn()
    return self.__conn.lpush(key, val)
  # 列表(List)-读取
  def BRPop(self, key: str, timeout: float):
    self.IsConn()
    return self.__conn.brpop(key, timeout)
  def BLPop(self, key: str, timeout: float):
    self.IsConn()
    return self.__conn.blpop(key, timeout)
