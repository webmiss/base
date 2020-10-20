import os
from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.library.Inc import Inc
from app.library.Upload import Upload
from app.model.UserInfo import UserInfo

class UserinfoController(Base) :

  tokenData = None
  imgDir = 'upload/user/img/'

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('UserInfo')

  # 头像上传
  def upImg(self):
    req = self.request()
    base64 = req.get('base64')
    if not base64 : return self.getJSON({'code':4000,'msg':'Base64内容为空!'})
    # 上传
    res = Upload().base64({'path':self.imgDir,'base64':base64})
    if res :
      info = UserInfo().findFirst({'where':'uid='+str(self.tokenData['uid'])})
      if not info :
        UserInfo().insert({
          'uid': self.tokenData['uid'],
          'img': self.imgDir+res['filename'],
          'ctime': Inc.date('%Y%m%d%H%M%S'),
        })
      else :
        # 头像
        img = info['img'] if info['img'] else ''
        # 保存
        UserInfo().update({
          'img': self.imgDir+res['filename'],
          'utime': Inc.date('%Y%m%d%H%M%S'),
        },'uid='+str(self.tokenData['uid']))
        # 清理头像
        if os.path.exists(img) : os.remove(img)
      return self.getJSON({'code':0,'msg':'上传成功','img':Env.base_url+self.imgDir+res['filename']})
    else :
      return self.getJSON({'code':5000,'msg':'保存图片失败!'})