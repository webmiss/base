from app.Env import Env
from app.common.Base import Base
from app.library.Inc import Inc
from app.library.Safety import Safety
from app.common.AdminToken import AdminToken
from app.model.User import User
from app.model.UserInfo import UserInfo

# 用户
class UserController(Base) :

  # 登录
  def login(self):
    req = self.request()
    uname = req.get('uname')
    passwd = Inc.md5(req.get('passwd'))
    # 验证用户名
    if Safety.isRight('uname',uname) and Safety.isRight('tel',uname) and Safety.isRight('email',uname) :
      return self.getJSON({'code':4000,'msg':'请输入用户名/手机/邮箱'})
    # 查询数据
    uData = User().findFirst({
      'table':'user as a LEFT JOIN user_info as b ON a.id=b.uid LEFT JOIN user_perm as c ON a.id=c.uid',
      'columns':'a.id, a.state, b.position, b.nickname, b.name, b.gender, b.img, c.state_admin',
      'where':f'(a.uname="{uname}" OR a.tel="{uname}" OR a.email="{uname}") AND a.password="{passwd}"',
    })
    # 是否存在
    if uData==None : return self.getJSON({'code':4000,'msg':'帐号或密码错误'})
    # 是否禁用
    if uData['state']!='1' : return self.getJSON({'code':4000,'msg':'该用户已被禁用'})
    elif  uData['state_admin']!='1' : return self.getJSON({'code':4000,'msg':'该用户不允许登录'})
    # 登录时间
    User().update({'ltime':Inc.date('%Y%m%d%H%M%S')},'id='+str(uData['id']))
    # 返回
    return self.getJSON({
      'code':0,
      'msg':'成功登录',
      'uinfo': {
        'uid':uData['id'],
        'uname':uname,
        'position':uData['position'],
        'nickname':uData['nickname'],
        'name':uData['name'],
        'gender':uData['gender'],
        'img': Env.base_url+uData['img'] if uData['img']!='' else '',
      },
      'token': AdminToken().create({'uid':uData['id'],'uname':uname})
    })

  # 验证Token
  def token(self) :
    request = self.request()
    uinfo = request.get('uinfo')
    res = AdminToken().verify()
    if res :
      if uinfo!='1' : return self.getJSON({'code':0,'time':res['n_time']})
      # 用户信息
      uinfo = UserInfo().findFirst({
        'where':'uid=%s'%(res['uid']),
        'columns':'nickname,position,name,img',
      })
      uinfo['uname'] = res['uname']
      uinfo['img'] = Env.base_url+uinfo['img'] if uinfo['img']!='' else ''
      return self.getJSON({'code':0,'msg':'成功','time':res['n_time'],'uinfo':uinfo})
    else :
      return self.getJSON({'code':4000, 'msg':'请重新登录!'})