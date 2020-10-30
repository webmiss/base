from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.library.Safety import Safety
from app.model.User import User

# 用户管理
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
      val['uid'] = str(val['uid'])
      val['img'] = Env.base_url+str(val['img']) if val['img'] else ''
      val['birthday'] = str(val['birthday']) if val['birthday'] else ''
      val['rtime'] = str(val['rtime']) if val['rtime'] else ''
      val['ltime'] = str(val['ltime']) if val['ltime'] else ''
      val['utime'] = str(val['utime']) if val['utime'] else ''
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})

  # 首页
  def add(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict or not data.get('tel') :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    tel = data['tel'].strip()
    passwd = Inc.md5(data['passwd']) if len(data['passwd'])>0 else Inc.md5('123456')
    # 验证手机
    res = Safety.isRight('tel',tel)
    if not Safety.isRight('tel',tel) :
      return self.getJSON({'code':4000,'msg':'手机号码有误!'})
    # 是否存在
    res = User().findFirst({'where':'tel=:tel:','bind':{'tel':tel}})
    if res : return self.getJSON({'code':4000,'msg':'该用户已存在!'})
    # 保存
    params = {
      'id': Inc.getId(),
      'tel': tel,
      'password': passwd,
      'rtime': Inc.date('%Y%m%d%H%M%S'),
    }
    # 结果
    if User().insert(params) == 0 :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'添加失败!'})
