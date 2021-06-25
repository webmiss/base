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
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    path = self.JsonName(json, 'path')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    list = FileEo.List(path)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'url':Env.base_url+self.__dirRoot, 'data':list})

  # 新建文件夹
  def Mkdir(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    path = self.JsonName(json, 'path')
    name = self.JsonName(json, 'name')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path or not name : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    if not FileEo.Mkdir(path+name) : return self.GetJSON({'code':5000, 'msg':'新建文件夹失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 重命名
  def Rename(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    path = self.JsonName(json, 'path')
    rename = self.JsonName(json, 'rename')
    name = self.JsonName(json, 'name')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path or not rename or not name : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    if not FileEo.Rename(path+rename, path+name) : return self.GetJSON({'code':5000, 'msg':'新建文件夹失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 上传
  def Upload(self):
    # 参数
    token = self.Post('token')
    path = self.Post('path')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    file = request.files['up']
    img = Upload.File(file, {'path':self.__dirRoot+path, 'bind':None})
    if not img : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 下载
  def Down(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    path = self.JsonName(json, 'path')
    filename = self.JsonName(json, 'filename')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path or not filename : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 返回
    FileEo.Root = Env.root_dir + self.__dirRoot
    return FileEo.Bytes(path+filename)

  # 删除
  def Remove(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    path = self.JsonName(json, 'path')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not path or not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    FileEo.Root = Env.root_dir + self.__dirRoot
    files = Util.JsonDecode(data)
    for val in files : FileEo.RemoveAll(path+val)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})