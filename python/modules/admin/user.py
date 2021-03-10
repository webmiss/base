from base.base import Base
from config.env import Env
from library.safety import Safety
from model.user import User as UserModel
from service.admin_token import AdminToken

from util.md5 import md5
from util.date import date

class User(Base):

  # 登录
  def login(self):
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
    model.LeftJoin('user_perm AS c', 'a.id=c.uid')
    model.Where(
      '(a.uname=%s OR a.tel=%s OR a.email=%s) AND a.password=%s',
      uname, uname, uname, md5(passwd)
    )
    model.Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.state_admin')
    data = model.FindFirst()
    # 是否存在
    if not data : return self.GetJSON({'code':4000, 'msg':'帐号或密码错误!'})
    # 是否禁用
    if data['state']!='1' : return self.GetJSON({'code':4000, 'msg':'该用户已被禁用!'})
    elif data['state_admin']!='1' : return self.GetJSON({'code':4000, 'msg':'该用户不允许登录!'})
    # 登录时间
    model.Table('user')
    model.Set({'ltime': date('%Y%m%d%H%M%S')})
    model.Where('id=%s', data['id'])
    model.Update()
    # 关闭
    model.Close()
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