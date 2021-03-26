import os
import time
import datetime
import base64 as Base64
from util.util import Util
from flask import request

# 上传类
class Upload:

  # 单文件
  def File(params={}):
    # 参数
    param = Util.ArrayMerge({
      'upName': 'up',     #上传名称
      'path':'upload/',   #上传目录
      'filename':'',      #文件名
      'bind':['jpg','jpeg','png','gif','mov','mp4','wav','mp3'], #允许格式
    }, params)
    # 文件
    file = request.files[param['upName']]
    # 限制格式
    ext = file.filename.split('.')[-1:][0].lower()
    if param['bind'] :
      if ext not in param['bind'] :
        print('只支持%s格式!'%(','.join(param['bind'])))
        return ''
    # 是否重命名
    param['filename'] = file.filename if not param['filename'] else param['filename']
    # 创建目录
    if not os.path.exists(param['path']) : os.makedirs(param['path'])
    # 保存文件
    if file.save(param['path']+param['filename'])==None :
      return param['filename']
    else :
      return ''

  # Base64
  def Base64(params={}):
    # 参数
    param = Util.ArrayMerge({
      'path':'upload/',   #上传目录
      'base64':'',        #文件内容
      'filename':'',      #文件名
      'ext':'png',        #后缀
    }, params)
    # 内容
    base64 = param['base64']
    # 否有类型
    ct = param['base64'].split(',')
    if len(ct)>1 :
      if ct[0]=='data:image/jpeg;base64' : param['ext']='jpg'
      elif ct[0]=='data:image/png;base64' : param['ext']='png'
      elif ct[0]=='data:image/gif;base64' : param['ext']='gif'
      base64 = ct[1]
    # 创建目录
    if not os.path.exists(param['path']) : os.makedirs(param['path'])
    # 文件名
    filename = Upload._getName()+'.'+param['ext'] if not param['filename'] else param['filename']
    with open(param['path']+filename,'wb') as f :
      f.write(Base64.b64decode(base64))
      f.close()
    return filename

  # 获取名称
  def _getName():
    d = time.strftime('%Y%m%d%H%M%S',time.localtime())
    t = datetime.datetime.now()
    n = str(t.microsecond)[2:6]
    return d+n