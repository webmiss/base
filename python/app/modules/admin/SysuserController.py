from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.model.User import User

class SysuserController(Base) :

  # 构造函数
  def __init__(self):
    AdminToken().urlVerify('SysUser')

  # 首页
  def list(self):
    req = self.request()
    data = req.get('data')
    # 搜索
    where = ''
    # 查询
    params = {
      'table': 'user as a LEFT JOIN user_info as b ON a.id=b.uid',
      'columns':
        'a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,'+
        'a.rtime as rtime,a.ltime as ltime,a.utime as utime,'+
        'b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img',
      'order': 'a.id DESC',
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
      val['img'] = Env.base_url+str(val['img']) if val['img'] else ''
      val['birthday'] = str(val['birthday']) if val['birthday'] else ''
      val['rtime'] = str(val['rtime']) if val['rtime'] else ''
      val['ltime'] = str(val['ltime']) if val['ltime'] else ''
      val['utime'] = str(val['utime']) if val['utime'] else ''
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})