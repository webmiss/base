from util.util import Util
from config.env import Env
from library.file_eo import FileEo
from library.upload import Upload
from service.base import Base
from service.admin_token import AdminToken

from flask import request

class SysFile(Base):

  __dirRoot: str='upload/'

  # 列表
  def List(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    path = self.Post('path')
    if not path : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    list = FileEo.List(path)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'url':Env.base_url+self.__dirRoot, 'data':list})

  # 新建文件夹
  def Mkdir(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    path = self.Post('path')
    name = self.Post('name')
    if not path or not name : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    if not FileEo.Mkdir(path+name) : return self.GetJSON({'code':5000, 'msg':'新建文件夹失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 重命名
  def Rename(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    path = self.Post('path')
    rename = self.Post('rename')
    name = self.Post('name')
    if not path or not rename or not name : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    if not FileEo.Rename(path+rename, path+name) : return self.GetJSON({'code':5000, 'msg':'新建文件夹失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 上传
  def Upload(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    path = self.Post('path')
    if not path : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    file = request.files['up']
    img = Upload.File(file, {'path':self.__dirRoot+path, 'bind':None})
    if not img : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 删除
  def Remove(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    path = self.Post('path')
    data = self.Post('data')
    if not path or not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    files = Util.JsonDecode(data)
    for val in files : FileEo.RemoveAll(path+val)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})