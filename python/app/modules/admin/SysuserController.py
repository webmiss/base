from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.common.Data import Data
from app.library.Safety import Safety
from app.model.User import User
from app.model.UserInfo import UserInfo

# 用户管理
class SysuserController(Base) :

  tokenData = {}

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('SysUser')

  # 首页
  def list(self):
    req = self.request()
    # 搜索
    data = Inc.json_decode(req.get('data'))
    uname = data['uname']
    where = 'a.uname LIKE \"%:uname:%\" OR a.tel LIKE \"%:uname:%\" OR a.email LIKE \"%:uname:%\"'
    bind = {'uname':uname}
    # 查询
    params = {
      'table': 'user as a LEFT JOIN user_info as b ON a.id=b.uid',
      'columns':
        'a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,'+
        'a.rtime as rtime,a.ltime as ltime,a.utime as utime,'+
        'b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img',
      'order': 'a.id DESC',
      'where': where,
      'bind': bind,
    }
    # 统计
    total = User().count(params)
    # 分页
    page = req.get('page')
    limit = req.get('limit')
    start = (int(page)-1)*int(limit)
    params['limit'] = str(start)+','+limit
    # 数据
    list = User().find(params)
    # 状态
    for val in list :
      val['state'] = True if val['state']=='1' else False
      val['uid'] = str(val['uid'])
      val['img'] = Env.base_url+str(val['img']) if val['img'] else ''
      val['birthday'] = str(val['birthday']) if val['birthday'] else ''
      val['rtime'] = str(val['rtime']) if val['rtime'] else ''
      val['ltime'] = str(val['ltime']) if val['ltime'] else ''
      val['utime'] = str(val['utime']) if val['utime'] else ''
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})

  # 添加
  def add(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict or not data.get('tel') :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    tel = data['tel'].strip()
    passwd = Inc.md5(data['passwd']) if data['passwd']!='' else Inc.md5('123456')
    # 验证手机
    res = Safety.isRight('tel',tel)
    if not Safety.isRight('tel',tel) :
      return self.getJSON({'code':4000,'msg':'手机号码有误!'})
    # 是否存在
    res = User().findFirst({'where':'tel=:tel:','bind':{'tel':tel}})
    if res : return self.getJSON({'code':4000,'msg':'该用户已存在!'})
    # 保存
    params = {
      'id': Data.getId(),
      'tel': tel,
      'password': passwd,
      'rtime': Inc.date('%Y%m%d%H%M%S'),
    }
    # 结果
    if User().insert(params) == 0 :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'添加失败!'})

  # 编辑
  def edit(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict or not data.get('tel') :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    uid = req.get('uid').strip()
    tel = data['tel'].strip()
    passwd = Inc.md5(data['passwd']) if data['passwd']!='' else ''
    # 验证手机
    res = Safety.isRight('tel',tel)
    if not Safety.isRight('tel',tel) :
      return self.getJSON({'code':4000,'msg':'手机号码有误!'})
    # 是否存在
    res = User().findFirst({'where':'tel=:tel:','bind':{'tel':tel}})
    if res :
      if passwd != '' :
        params = {'data': {'password':passwd}, 'where':'id=:uid:', 'bind':{'uid':uid}}
        if User().update(params) : return self.getJSON({'code':0,'msg':'成功'})
        else : return self.getJSON({'code':5000,'msg':'更新密码失败!'})
      else :
        return self.getJSON({'code':4000,'msg':'密码为6-16位字符!'})
    # 修改手机
    uData = {'tel':tel}
    if passwd != '' : uData['password']=passwd
    params = {'data': uData, 'where':'id=:uid:', 'bind':{'uid':uid}}
    if User().update(params) :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'编辑失败!'})

  # 删除
  def delete(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 管理员
    if '1' in data or 1 in data :
      return self.getJSON({'code':4000,'msg':'无法删除系统管理员!'})
    # ID
    ids = Inc.implode(',',data)
    user = {'where':'id in(:uid:)','bind':{'uid':ids}}
    uinfo = {'where':'uid in(:uid:)','bind':{'uid':ids}}
    # 结果
    if User().delete(user) and UserInfo().delete(uinfo) :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'删除失败!'})

  # 状态
  def state(self):
    # 参数
    req = self.request()
    uid = req.get('uid').strip()
    state = req.get('state').strip()
    if not uid or not state : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 管理员
    if uid=='1' : return self.getJSON({'code':4000,'msg':'禁止修改系统管理员!'})
    # 更改
    uData = {'state': '1' if state=='1' else '0'}
    params = {'data': uData, 'where':'id=:uid:', 'bind':{'uid':uid}}
    # 结果
    if User().update(params) :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'更新失败!'})

  # 用户信息
  def info(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    uid = req.get('uid').strip()
    # 管理员
    if self.tokenData['uid']!='1' and uid=='1' :
      return self.getJSON({'code':4000,'msg':'非系统管理员!'})
    # 查询
    info = UserInfo().findFirst({'where':'uid=:uid:','bind':{'uid':uid}})
    # 数据
    uData = {}
    arr = ['uid']
    keys = data.keys()
    for key in keys :
      if key in arr : continue
      uData[key] = data[key].strip()
    uData['birthday'] = uData['birthday'] if uData['birthday']!='' else 'null'
    # 是否存在
    if not info :
      uData['uid'] = uid
      UserInfo().insert(uData)
    else :
      params = {'data':uData,'where':'uid=:uid:','bind':{'uid':uid}}
      UserInfo().update(params)
    # 结果
    return self.getJSON({'code':0,'msg':'成功'})
