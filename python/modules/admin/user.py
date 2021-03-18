from base.base import Base
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from model.user import User as UserModel
from model.user_info import UserInfo
from service.admin_token import AdminToken
from util.util import Util
from util.data import Data

from flask import request

class User(Base):

  # 登录
  def Login(self):
    uname = self.Post('uname')
    passwd = self.Post('passwd')
    # 验证用户名
    if not Safety.isRight('uname',uname) and not Safety.isRight('tel',uname) and not Safety.isRight('email',uname):
      return self.GetJSON({'code':4000, 'msg':'请输入用户名/手机/邮箱'})
    # 密码长度
    if not Safety.isRight('passwd',passwd) :
      return self.GetJSON({'code':4000, 'msg':'请输入6~16位密码'})
    # 查询
    model = UserModel()
    model.Table('user AS a')
    model.LeftJoin('user_info AS b', 'a.id=b.uid')
    model.LeftJoin('sys_perm AS c', 'a.id=c.uid')
    model.Where(
      '(a.uname=%s OR a.tel=%s OR a.email=%s) AND a.password=%s',
      uname, uname, uname, Util.md5(passwd)
    )
    model.Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.role', 'c.perm')
    data = model.FindFirst()
    # 是否存在
    if not data : return self.GetJSON({'code':4000, 'msg':'帐号或密码错误!'})
    # 是否禁用
    if data['state']!='1' : return self.GetJSON({'code':4000, 'msg':'该用户已被禁用!'})
    # 权限
    perm = data['role']
    if data['perm'] : perm=data['perm']
    if not perm : return self.GetJSON({'code':4000, 'msg':'该用户不允许登录!'})
    redis = Redis()
    key = Env.admin_token_prefix+'_perm_'+str(data['id'])
    redis.Set(key, perm)
    redis.Expire(key, Env.admin_token_time)
    redis.Close()
    # 登录时间
    model.Table('user')
    model.Set({'ltime': Util.date('%Y%m%d%H%M%S')})
    model.Where('id=%s', data['id'])
    model.Update()
    # 返回
    return self.GetJSON({
      'code': 0,
      'msg': '成功',
      'token': AdminToken().create({'uid':str(data['id']), 'uname':uname}),
      'uinfo': {
        'uid': data['id'],
        'uname': uname,
        'position': data['position'],
        'nickname': data['nickname'],
        'name': data['name'],
        'gender': data['gender'],
        'img': Env.base_url+data['img'] if data['img']!='' else '',
      }
    })

  # Token验证
  def Token(self):
    # 验证 request.path
    token = self.Post('token')
    msg = AdminToken().verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    uinfo = self.Post('uinfo')
    if uinfo!='1' : return self.GetJSON({'code':0, 'msg':'成功'})
    # 用户信息
    tData = AdminToken.token(token)
    model = UserInfo()
    model.Columns('nickname','position','name','img')
    model.Where('uid=%s',tData['uid'])
    info = model.FindFirst()
    info['uname'] = tData['uname']
    info['img'] = Data.img(info['img'])
    return self.GetJSON({'code':0, 'msg':'成功', 'uinfo':info})