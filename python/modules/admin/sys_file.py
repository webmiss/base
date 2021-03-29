from config.env import Env
from library.file_eo import FileEo
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
    FileEo.Root = Env.root_dir + self.__dirRoot
    list = FileEo.List(path)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'url':Env.base_url+self.__dirRoot, 'data':list})
