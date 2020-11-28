from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.common.Data import Data
from app.model.Model import Model
from app.model.User import User
from app.model.UserInfo import UserInfo
from app.model.UserPerm import UserPerm

# 用户管理
class SysuserController(Base) :

  tokenData = {}

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('SysUser')

  # 列表
  def list(self):
    req = self.request()
    # 搜索
    data = Inc.json_decode(req.get('data'))
    uname = data['uname'].strip() if 'uname' in data.keys() else ''
    where = 'a.uname LIKE "%:uname:%" OR a.tel LIKE "%:uname:%" OR a.email LIKE "%:uname:%"'
    bind = {'uname':uname}
    # 查询
    model = User()
    model.table('user AS a LEFT JOIN user_info AS b ON a.id=b.uid LEFT JOIN user_perm AS c ON a.id=c.uid')
    model.columns(
      'a.id AS uid, a.uname, a.email, a.tel, a.state, a.rtime, a.ltime, a.utime,'+
      'b.nickname, b.position, b.name, b.gender, b.birthday, b.img,'+
      'c.role, c.state_admin, c.state_app, c.perm'
    )
    model.where(where,bind)
    model.order('a.id DESC')
    # 统计
    total = model.count()
    # 分页
    page = req.get('page')
    limit = req.get('limit')
    start = (int(page)-1)*int(limit)
    model.limit(str(start)+','+limit)
    # 数据
    list = model.find()
    # 状态
    for val in list :
      val['state'] = True if val['state']=='1' else False
      val['state_admin'] = True if val['state_admin']=='1' else False
      val['state_app'] = True if val['state_app']=='1' else False
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
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    id = Data.getId()
    tel = data['tel'].strip() if 'tel' in data.keys() and data['tel']!='' else ''
    passwd = Inc.md5(data['passwd']) if 'passwd' in data.keys() and data['passwd']!='' else ''
    # 是否存在
    user = User()
    user.where('tel=:tel:',{'tel':tel})
    res = user.findFirst()
    if len(res)>0 : return self.getJSON({'code':4000,'msg':'该用户已存在!'})
    # 事务
    model = Model()
    model.begin()
    # 用户
    m1 = User()
    m1.id = id
    m1.tel = tel
    m1.password = passwd
    # 信息
    m2 = UserInfo()
    m2.uid = id
    # 权限
    m3 = UserPerm()
    m3.uid = id
    # 结果
    if m1.create() and m2.create() and m3.create() :
      model.commit()
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      model.commit()
      return self.getJSON({'code':5000,'msg':'添加失败!'})

  # 编辑
  def edit(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    uid = req.get('uid').strip()
    tel = data['tel'].strip() if 'tel' in data.keys() and data['tel']!='' else '0'
    passwd = Inc.md5(data['passwd']) if 'passwd' in data.keys() and data['passwd']!='' else ''
    # 是否存在
    m1 = User()
    m1.where('tel=":tel:"',{'tel':tel})
    res = m1.findFirst()
    model = User()
    if len(res)>0 :
      model.password = passwd if passwd!='' else res['password']
      model.where('tel=":tel:"',{'tel':tel})
    else :
      model.tel = tel
      model.password = passwd
      model.where('id=:id:',{'id':uid})
    # 结果
    if model.update() :
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
    user = User()
    user.where('id in(:uid:)',{'uid':ids})
    uinfo = UserInfo()
    uinfo.where('uid in(:uid:)',{'uid':ids})
    perm = UserPerm()
    perm.where('uid in(:uid:)',{'uid':ids})
    # 结果
    model = Model()
    model.begin()
    if user.delete() and uinfo.delete() and perm.delete() :
      model.commit()
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      model.commit()
      return self.getJSON({'code':5000,'msg':'删除失败!'})

  # 状态
  def state(self):
    # 参数
    req = self.request()
    uid = req.get('uid').strip()
    type = req.get('type').strip()
    state = req.get('state').strip()
    if not uid or not state : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 管理员
    if uid=='1' : return self.getJSON({'code':4000,'msg':'禁止修改系统管理员!'})
    # 更改
    state = '1' if state=='1' else '0'
    if type=='state' :
      model = User()
      model.state = state
      model.where('id=:uid:',{'uid':uid})
    elif type=='state_admin' :
      model = UserPerm()
      model.state_admin = state
      model.where('uid=:uid:',{'uid':uid})
    elif type=='state_app' :
      model = UserPerm()
      model.state_app = state
      model.where('uid=:uid:',{'uid':uid})
    else :
      return self.getJSON({'code':4000,'msg':'未知类型!'})
    # 结果
    if model.update() :
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
    # 数据
    model = UserInfo()
    model.nickname = data['nickname'].strip()
    model.name = data['name'].strip()
    model.gender = data['gender'].strip()
    model.birthday = data['gender'].strip()
    model.position = data['position'].strip()
    model.where('uid=:uid:',{'uid':uid})
    # 结果
    if model.update() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'更新失败!'})
