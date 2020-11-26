from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.model.SysMenu import SysMenu
from app.model.SysMenuAction import SysMenuAction

# 用户
class SysmenusactionController(Base) :

  tokenData = {}

  # 列表
  def list(self):
    # 验证
    AdminToken().urlVerify('SysMenusAction')
    # 搜索
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    name = data['name'].strip() if 'name' in data.keys() else ''
    action = data['action'].strip() if 'action' in data.keys() else ''
    where = 'name LIKE "%:name:%" AND action LIKE "%:action:%"'
    bind = {'name':name,'action':action}
    # 查询
    model = SysMenuAction()
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
    print(model.getSql())
    # 返回
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})

  # 添加
  def add(self):
    # 验证
    AdminToken().urlVerify('SysMenusAction')
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 数据
    model = SysMenuAction()
    model.name = data['name'].strip() if 'name' in data.keys() else ''
    model.action = data['action'].strip() if 'action' in data.keys() else ''
    model.perm = data['perm'].strip() if 'perm' in data.keys() else 2
    model.ico = data['ico'].strip() if 'ico' in data.keys() else ''
    # 结果
    if model.create() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'添加失败!'})

  # 编辑
  def edit(self):
    # 验证
    AdminToken().urlVerify('SysMenusAction')
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    id = req.get('id').strip()
    # 数据
    model = SysMenuAction()
    model.name = data['name'].strip() if 'name' in data.keys() else ''
    model.action = data['action'].strip() if 'action' in data.keys() else ''
    model.perm = data['perm'].strip() if 'perm' in data.keys() else 2
    model.ico = data['ico'].strip() if 'ico' in data.keys() else ''
    model.where('id=:id:',{'id':id})
    # 结果
    if model.update() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'编辑失败!'})

  # 删除
  def delete(self):
    # 验证
    AdminToken().urlVerify('SysMenusAction')
    # 参数
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    if not data :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    # ID
    ids = Inc.implode(',',data)
    model = SysMenuAction()
    model.where('id in(:ids:)',{'ids':ids})
    # 结果
    if model.delete() :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'删除失败!'})

  # 获取[动作菜单]
  def getAction(self):
    # 验证
    self.tokenData = AdminToken().verify()
    # 参数
    req = self.request()
    url = req.get('url')
    if url=='' : return self.getJSON({'code':4000,'msg':'获取动作不能为空!'})
    # 菜单ID
    m1 = SysMenu()
    m1.where('url=":url:"',{'url':url})
    m1.columns('id')
    mid = m1.findFirst()
    if len(mid)==0 : return self.getJSON({'code':4000,'msg':'获取 '+str(url)+' 不存在!'})
    # 全部动作
    action = []
    permAll = AdminToken().perm(self.tokenData['uid'])
    perm = permAll[str(mid['id'])]
    m2 = SysMenuAction()
    m2.columns('name,action,ico,perm')
    aMenus = m2.find()
    for val in aMenus :
      # 匹配权限值
      if int(perm)&int(val['perm'])>0 :
        action += [{'name':val['name'],'action':val['action'],'ico':val['ico']}]
    return self.getJSON({'code':0,'action':action})
