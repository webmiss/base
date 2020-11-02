import os
from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.library.Files import Files

# 文件管理
class SysfilemanageController(Base) :

  dirRoot = 'upload/'

  # 构造函数
  def __init__(self):
    AdminToken().urlVerify('SysFileManage')
    # 文件根目录
    Files.file_root = self.dirRoot
    if not os.path.exists(self.dirRoot) : os.makedirs(self.dirRoot)

  # 列表
  def list(self):
    req = self.request()
    path = req.get('path')
    list = Files().lists(path)
    return self.getJSON({'code':0,'url':Env.base_url+self.dirRoot,'data':list})