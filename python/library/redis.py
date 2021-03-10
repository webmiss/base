import redis
from base.base import Base
from config.redis import Redis as Cfg

# 缓存数据库
class Redis(Base):

  __conn = None

  # 连接
  def Conn(self):
    cfg = {
      'host': Cfg.host,
      'port': Cfg.port,
      'password': Cfg.password,
      'db': Cfg.db,
      'decode_responses': True,
    }
    try:
      pool = redis.ConnectionPool(**cfg)
      rs = redis.StrictRedis(connection_pool=pool)
      if not rs.ping() : return None
      self.__conn = rs
    except Exception as e:
      self.Print('[Redis] Conn:', e)
    return self.__conn

  # 添加
  def Set(self, key: str, val: str):
    if not self.Conn() : return
    return self.__conn.set(key, val)
  # 获取
  def Get(self, key: str):
    if not self.Conn() : return
    return self.__conn.get(key)
  # 删除
  def Del(self, *key: str):
    if not self.Conn() : return
    return self.__conn.delete(key)
  # 是否存在
  def Exist(self, key: str):
    if not self.Conn() : return
    return self.__conn.exists(key)
  # 设置过期时间(秒)
  def Expire(self, key: str, ttl: int):
    if not self.Conn() : return
    return self.__conn.expire(key, ttl)
  # 获取过期时间(秒)
  def Ttl(self, key: str):
    if not self.Conn() : return
    return self.__conn.ttl(key)
  # 获取长度
  def StrLen(self, key: str):
    if not self.Conn() : return
    return self.__conn.strlen(key)

  # 哈希(Hash)-添加
  def HSet(self, name: str, key, val):
    if not self.Conn() : return
    return self.__conn.hset(name, key, val)
  def HMSet(self, name: str, obj):
    if not self.Conn() : return
    return self.__conn.hmset(name, obj)
  # 哈希(Hash)-获取
  def HGet(self, name: str, key):
    if not self.Conn() : return
    return self.__conn.hget(name, key)
  def HMGet(self, name: str, key):
    if not self.Conn() : return
    return self.__conn.hmget(name, key)
  # 哈希(Hash)-删除
  def HDel(self, name: str, *key):
    if not self.Conn() : return
    return self.__conn.hdel(name, key)
  # 哈希(Hash)-是否存在
  def HExist(self, name: str, key):
    if not self.Conn() : return
    return self.__conn.hexists(name, key)
  # 哈希(Hash)-Key个数
  def HLen(self, name: str):
    if not self.Conn() : return
    return self.__conn.hlen(name)