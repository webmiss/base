from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.date import date

# 后台Token
class AdminToken:

  # 生成
  def create(self, data: dict):
    data['l_time'] = date('%Y-%m-%d %H:%M:%S')
    token = Safety.encode(data)
    # 缓存
    key = Env.admin_token_prefix+str(data['uid'])
    Redis().Set(key, '1')
    Redis().Expire(key, Env.admin_token_time)
    return token
    
