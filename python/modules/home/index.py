from service.base import Base
from config.env import Env
from library.file_eo import FileEo
from library.qrcode import Qrcode

from flask import send_file

class Index(Base) :

  # 首页
  def Index(self):
    # 返回
    return self.GetJSON({'code':0,'msg':'Web'})

  # 二维码
  def Qrcode(self, name: str):
    text: str = ''
    if name=='docs' : text='https://webmis.vip/'
    elif name=='demo' : text='https://demo-app.webmis.vip/'
    elif name=='wechat' : text='http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK'
    elif name=='server1' : text='https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So'
    elif name=='server2' : text='https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo'
    # 创建目录
    path = 'upload/qrcode/'
    FileEo.Root = Env.root_dir
    if not FileEo.Mkdir(path): return
    # 是否生成
    file = path + name + '.png'
    if not FileEo.IsFile():
      ct = Qrcode.Create({'text': text})
      FileEo.Writer(file, ct)
    # 返回
    return send_file(Env.root_dir+file, mimetype='image/png')