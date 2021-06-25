from service.base import Base
from service.data import Data
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from service.api_token import ApiToken
from model.user import User as UserModel
from model.user_info import UserInfo
from util.util import Util
from util.hash import Hash

class User(Base):

  # 登录
  def Login(self):
    # 参数
    json = self.Json()
    uname = self.JsonName(json, 'uname')
    passwd = self.JsonName(json, 'passwd')
    # 验证用户名
    if not Safety.IsRight('uname',uname) and not Safety.IsRight('tel',uname) and not Safety.IsRight('email',uname):
      return self.GetJSON({'code':4000, 'msg':'请输入用户名/手机/邮箱'})
    # 密码长度
    if not Safety.IsRight('passwd',passwd) :
      return self.GetJSON({'code':4000, 'msg':'请输入6~16位密码'})
    # 查询
    model = UserModel()
    model.Table('user AS a')
    model.LeftJoin('user_info AS b', 'a.id=b.uid')
    model.LeftJoin('api_perm AS c', 'a.id=c.uid')
    model.LeftJoin('api_role AS d', 'c.role=d.id')
    model.Where(
      '(a.uname=%s OR a.tel=%s OR a.email=%s) AND a.password=%s',
      uname, uname, uname, Hash.Md5(passwd)
    )
    model.Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.perm', 'd.perm as role_perm')
    data = model.FindFirst()
    # 是否存在
    if not data : return self.GetJSON({'code':4000, 'msg':'帐号或密码错误!'})
    # 是否禁用
    if data['state']!='1' : return self.GetJSON({'code':4000, 'msg':'该用户已被禁用!'})
    # 权限
    perm = data['role_perm']
    if data['perm'] : perm=data['perm']
    if not perm : return self.GetJSON({'code':4000, 'msg':'该用户不允许登录!'})
    redis = Redis()
    key = Env.api_token_prefix+'_perm_'+str(data['id'])
    redis.Set(key, perm)
    redis.Expire(key, Env.api_token_time)
    redis.Close()
    # 登录时间
    model.Table('user')
    model.Set({'ltime': Util.Time()})
    model.Where('id=%s', data['id'])
    model.Update()
    # 返回
    return self.GetJSON({
      'code': 0,
      'msg': '成功',
      'token': ApiToken.Create({'uid':str(data['id']), 'uname':uname}),
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
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    uinfo = self.JsonName(json, 'uinfo')
    # 验证
    msg = ApiToken.Verify(token, '')
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    tData = ApiToken.Token(token)
    if uinfo!='1' :
      return self.GetJSON({'code':0, 'msg':'成功', 'token_time':tData['time']})
    # 用户信息
    model = UserInfo()
    model.Columns('nickname','position','name','img')
    model.Where('uid=%s',tData['uid'])
    info = model.FindFirst()
    info['uname'] = tData['uname']
    info['img'] = Data.Img(info['img'])
    return self.GetJSON({'code':0, 'msg':'成功', 'token_time':tData['time'], 'uinfo':info})