import redis
from app.Env import Env

# 缓存数据库
class Redis :

  # 启动
  def run():
    conf = Env.redis()
    pool = redis.ConnectionPool(**conf)
    try:
      rs = redis.StrictRedis(connection_pool=pool)
      rs.ping()
      return rs
    except Exception as e:
      print('Redis: ',e)
      print('请检测Redis是否启动!')
