from flask import request

from library.file_eo import FileEo
from library.upload import Upload
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from model.sys_config import SysConfig as SysConfigM
from util.util import Util

class SysConfig(Base):

  ImgDir: str='upload/admin/img/'

  # 列表
  def List(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    # 查询
    m = SysConfigM()
    m.Columns('name', 'val')
    data = m.Find()
    # 数据
    list = {}
    for val in data :
      if val['name']=='logo' or val['name']=='login_bg' :
        list[val['name']] = Data.Img(val['val'])
      else :
        list[val['name']] = val['val']
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list})

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 模型
    m = SysConfigM()
    param = Util.JsonDecode(data)
    for key, val in param.items() :
      if key=='logo' or key=='login_bg' : continue
      m.Set({'val': Util.Trim(val)})
      m.Where('name=%s', key)
      if not m.Update() :
        return self.GetJSON({'code':5000, 'msg':'更新失败!'})
    return self.GetJSON({'code':0, 'msg':'成功'})

  # 头像
  def Upimg(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    name = self.JsonName(json, 'name')
    base64 = self.JsonName(json, 'base64')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not base64 :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    if name!='logo' and name!='login_bg' :
      return self.GetJSON({'code':4000, 'msg':'类型错误!'})
    # 上传
    img = Upload.Base64({'path':self.ImgDir, 'base64':base64})
    if not img : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 模型
    m = SysConfigM()
    m.Columns('val')
    m.Where('name=%s', name)
    imgData = m.FindFirst()
    m.Set({'val': self.ImgDir+img})
    m.Where('name=%s', name)
    if not m.Update() : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 清理
    rmImg = imgData['val']
    FileEo.RemoveAll(rmImg)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'img':Data.Img(self.ImgDir+img)})