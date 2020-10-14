import redis
from app.Env import Env

# 缓存数据库
class Redis:

  # 启动
  def run():
    conf = Env.redis()
    pool = redis.ConnectionPool(**conf)
    return redis.StrictRedis(connection_pool=pool)
