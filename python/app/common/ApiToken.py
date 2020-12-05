from flask import request

from app.Env import Env
from app.common.Base import Base
from app.common.Inc import Inc

from app.library.Safety import Safety
from app.library.Redis import Redis

class ApiToken(Base):

  # 验证-Socket
  def socket(token) :
    # 验证Token
    res = Safety.decode(token)
    if res==None : return {'state':False,'msg':'Token验证失败!'}
    name = Env.api_token_prefix+str(res['uid'])
    # 是否超时
    time = Redis.run().ttl(name)
    if time<=0 : return {'state':False,'msg':'Token已超时!'}
    res['n_time'] = time
    return {'state':True,'data':res}

  # 验证&数据
  def verify(self) :
    # 获取Token
    data = None
    if request.method=='POST': data=request.form
    elif request.method=='GET': data=request.args
    token = data.get('token')
    # 验证Token
    res = Safety.decode(token)
    if res==None : self.error('Token验证失败!')
    name = Env.api_token_prefix+str(res['uid'])
    # 是否超时
    time = Redis.run().ttl(name)
    if time<=0 : self.error('Token已超时!')
    res['n_time'] = time
    # 是否续期
    if Env.api_token_auto : Redis.run().setex(name,Env.api_token_time,'1')
    return res

  # 生成
  def create(self,data) :
    data['l_time'] = Inc.date('%Y-%m-%d %H:%M:%S')
    token = Safety.encode(data)
    # 缓存
    name = Env.api_token_prefix+str(data['uid'])
    Redis.run().setex(name,Env.api_token_time,'1')
    return token
