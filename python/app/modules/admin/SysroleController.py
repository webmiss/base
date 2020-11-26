from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.model.UserRole import UserRole

# 用户角色
class SysroleController(Base) :

  # 构造函数
  def __init__(self):
    AdminToken().urlVerify('SysRole')

  # 列表
  def list(self):
    req = self.request()
    # 搜索
    data = Inc.json_decode(req.get('data'))
    role = data['role'].strip() if 'role' in data.keys() else ''
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

  # 添加
  def add(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 数据
    model = UserRole()
    model.role = data['role'].strip() if 'role' in data.keys() else ''
    # 结果
    if model.create() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'添加失败!'})

  # 编辑
  def edit(self):
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    id = req.get('id').strip()
    # 数据
    model = UserRole()
    model.role = data['role'].strip() if 'role' in data.keys() else ''
    model.where('id=:id:',{'id':id})
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
    # ID
    ids = Inc.implode(',',data)
    model = UserRole()
    model.where('id in(:ids:)',{'ids':ids})
    # 结果
    if model.delete() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'删除失败!'})
