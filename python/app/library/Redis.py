import redis
from app.Env import Env

# 缓存数据库
class Redis:

  # 启动
  def run(self):
    conf = Env.redis(self)
    pool = redis.ConnectionPool(**conf)
    return redis.StrictRedis(connection_pool=pool)
