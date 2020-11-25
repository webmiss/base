from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.model.UserPerm import UserPerm

# 用户管理
class SyspermController(Base) :

  tokenData = {}

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('SysPerm')

  # 列表
  def list(self):
    req = self.request()
    # 搜索
    data = Inc.json_decode(req.get('data'))
    uname = data['uname']
    where = 'b.uname LIKE \"%:uname:%\" OR b.tel LIKE \"%:uname:%\" OR b.email LIKE \"%:uname:%\"'
    bind = {'uname':uname}
    # 查询
    model = UserPerm()
    model.table('user_perm AS a LEFT JOIN user AS b ON a.uid=b.id LEFT JOIN user_info AS c ON a.uid=c.uid')
    model.columns(
      'a.uid, a.perm, a.role, a.state_admin, a.state_app,'+
      'b.uname, b.email, b.tel, b.state, b.rtime, b.ltime, b.utime,'+
      'c.nickname, c.position, c.name, c.gender, c.birthday, c.img'
    )
    model.where(where,bind)
    model.order('a.uid DESC')
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
