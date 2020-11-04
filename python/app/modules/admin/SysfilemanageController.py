import os
from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.library.Files import Files
from app.library.Upload import Upload

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

  # 新建文件夹
  def mkDir(self):
    # 参数
    req = self.request()
    path = req.get('path').strip()
    name = req.get('name').strip()
    if not path or not name : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 结果
    if Files().mkDir(path+name) :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'新建文件夹失败!'})

  # 重命名
  def reName(self):
    # 参数
    req = self.request()
    path = req.get('path').strip()
    rename = req.get('rename').strip()
    name = req.get('name').strip()
    if not path or not rename or not name : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 结果
    if Files().reName(path+rename,path+name) :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'重命名失败!'})

  # 上传
  def upFile(self):
    # 参数
    req = self.request()
    path = req.get('path').strip()
    if not path : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 执行
    res = Upload().file({'path':self.dirRoot+path,'bind':None})
    if res['state'] :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':res['msg']})

  # 删除
  def rmFile(self):
    # 参数
    req = self.request()
    path = req.get('path').strip()
    data = Inc.json_decode(req.get('data').strip())
    if not path or not data : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 执行
    for val in data : Files().delAll(path+str(val))
    return self.getJSON({'code':0,'msg':'成功'})
