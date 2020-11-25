from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.model.UserRole import UserRole

# 用户角色
class SysroleController(Base) :

  tokenData = {}

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('SysPerm')

  # 列表
  def list(self):
    req = self.request()
    # 搜索
    data = Inc.json_decode(req.get('data'))
    role = data['role'].strip()
    where = 'role LIKE \"%:role:%\"'
    bind = {'role':role}
    # 查询
    model = UserRole()
    model.where(where,bind)
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
      val['ctime'] = str(val['ctime']) if val['ctime'] else ''
      val['utime'] = str(val['utime']) if val['utime'] else ''
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})
