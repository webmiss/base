import os
import json
from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.library.Upload import Upload
from app.model.SysConfig import SysConfig

class SysconfigController(Base) :

  imgDir = 'upload/admin/img/'

  # 构造函数
  def __init__(self):
    AdminToken().urlVerify('SysConfig')

  # 列表
  def list(self):
    # 查询
    model = SysConfig()
    model.columns('name,val')
    config = model.find()
    list = {}
    for val in config :
      list[val['name']] = val['val']
      # 图片
      if val['name']=='logo' or val['name']=='login_bg' :
        list[val['name']] = Env.base_url+val['val'] if val['val']!='' else ''
    return self.getJSON({'code':0,'msg':'成功','list':list})

  # 编辑
  def edit(self):
    req = self.request()
    data = req.get('data')
    if(not data): return self.getJSON({'code':4000,'msg':'参数错误!'})
    jsonData = json.loads(data)
    # 查询
    model = SysConfig()
    model.where('name in ("title","http","copy")')
    model.columns("name")
    config = model.find()
    # 保存
    for val in config :
      model = SysConfig()
      if val['name']=='title' : model.val = jsonData['title'].strip()
      elif val['name']=='http' : model.val = jsonData['http'].strip()
      elif val['name']=='copy' : model.val = jsonData['copy'].strip()
      model.where('name="'+val['name']+'"')
      model.update()
    # 结果
    return self.getJSON({'code':0,'msg':'成功'})

  # 头像上传
  def upImg(self):
    req = self.request()
    type = req.get('type')
    base64 = req.get('base64')
    if not type or not base64 : return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 类型
    if type=='logo' : name='logo'
    elif type=='login_bg' : name='login_bg'
    else : return self.getJSON({'code':4000,'msg':'类型错误!'})
    # 上传
    res = Upload().base64({'path':self.imgDir,'base64':base64})
    if res :
      m1 = SysConfig()
      m1.where('name=\"'+name+'\"')
      m1.columns("val")
      info = m1.findFirst()
      # 头像
      img = info['val'] if info['val'] else ''
      # 保存
      m2 = SysConfig()
      m2.val = self.imgDir+res['filename']
      m2.where('name="'+name+'"')
      if m2.update() :
        # 清理头像
        if os.path.exists(img) : os.remove(img)
        return self.getJSON({'code':0,'msg':'上传成功','img':Env.base_url+self.imgDir+res['filename']})
      else :
        return self.getJSON({'code':5000,'msg':'保存数据失败!'})
    else :
      return self.getJSON({'code':5000,'msg':'保存图片失败!'})