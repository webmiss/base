from task.base import Base
from config.redis import Redis as Cfg
from library.redis import Redis as RedisDB

class Redis(Base):

  # 日志-消费者
  def Logs(self):
    while True :
      redis = RedisDB()
      data = redis.BLPop('logs', Cfg.Default()['timeout'])
      redis.Close()
      if not data : continue
      self.Print('Logs', data)