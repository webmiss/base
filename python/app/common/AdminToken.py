from flask import request
from app.Env import Env
from app.common.Base import Base

from app.library.Inc import Inc
from app.library.Safety import Safety
from app.library.Redis import Redis

from app.model.SysMenu import SysMenu
from app.model.UserPerm import UserPerm
from app.model.UserRole import UserRole

class AdminToken(Base):

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
    name = Env.admin_token_prefix+str(res['uid'])
    # 是否超时
    time = Redis.run().ttl(name)
    if time<=0 : self.error('Token已超时!')
    res['n_time'] = time
    # 是否续期
    if Env.admin_token_auto : Redis.run().setex(name,Env.admin_token_time,'1')
    return res

  # 生成
  def create(self,data) :
    data['l_time'] = Inc.date('%Y%m%d%H%M%S')
    token = Safety.encode(data)
    # 缓存
    name = Env.admin_token_prefix+str(data['uid'])
    Redis.run().setex(name,Env.admin_token_time,'1')
    return token

  # Url权限
  def urlVerify(self,url):
    token = self.verify()
    # 全部菜单
    all = SysMenu().find({'where':'url<>""','columns':'id,url'})
    menus = {}
    for val in all :
      menus[val['url']] = val['id']
    # 权限
    perm = UserPerm().findFirst({'where':'uid='+str(token['uid']),'columns':'perm,role'})
    if perm==None : self.error('没有分配权限!')
    if perm['role']!='0' : perm=UserRole().findFirst({'where':'id='+str(perm['role']),'columns':'perm'})
    # 拆分
    permAll = []
    permStr = perm['perm']
    arr = permStr.split(' ')
    for val in arr :
      s = val.split(':')
      permAll.append(s[0])
    # 是否存在
    if url not in menus.keys() : self.error('Url错误!')
    # 是否有权限
    if str(menus[url]) not in permAll : self.error('无权访问!')
    return True
