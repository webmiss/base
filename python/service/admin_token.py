from hashlib import md5
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.util import Util

# 后台Token
class AdminToken:

  # 生成
  def create(self, data: dict):
    data['l_time'] = Util.date('%Y-%m-%d %H:%M:%S')
    token = Safety.encode(data)
    # 缓存
    key = Env.admin_token_prefix+str(data['uid'])
    redis = Redis()
    redis.Set(key, '1')
    redis.Expire(key, Env.admin_token_time)
    redis.Close()
    return token
    
