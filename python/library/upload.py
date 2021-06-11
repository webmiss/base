import time, datetime, random, re, os
from config.env import Env
from library.file_eo import FileEo
from util.util import Util
from util.base64 import Base64

# 上传类
class Upload:

  # 单文件
  def File(file, params={}):
    # 参数
    param = Util.ArrayMerge({
      'path':'upload/',   #上传目录
      'filename':'',      #文件名
      'bind':['svg', 'jpg','jpeg','png','gif','mov','mp4','wav','mp3'], #允许格式
    }, params)
    # 限制格式
    ext = FileEo.GetExt(file.filename)
    if param['bind'] :
      if ext not in param['bind'] :
        print('只支持%s格式!'%(','.join(param['bind'])))
        return ''
    # 是否重命名
    param['filename'] = file.filename if not param['filename'] else param['filename']+'.'+ext
    # 创建目录
    FileEo.Root = Env.root_dir
    if not FileEo.Mkdir(param['path']):
      print('[Upload] Mkdir:', '创建目录失败!')
      return ''
    # 保存文件
    if not FileEo.Upload(file, param['path']+param['filename']):
      print('[Upload] Upload:', '保存文件失败!')
      return ''
    return param['filename']

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
    ct = Util.Explode(',', param['base64'])
    if len(ct)>1 :
      param['ext'] = Base64.GetExt(ct[0])
      base64 = ct[1]
    # 创建目录
    FileEo.Root = Env.root_dir
    if not FileEo.Mkdir(param['path']) :
      print('[Upload] Mkdir:', '创建目录失败!')
      return ''
    # 文件名
    filename = Upload.GetFileName()+'.'+param['ext'] if not param['filename'] else param['filename']
    if not FileEo.Writer(param['path']+filename, Base64.Decode(base64)) :
      print('[Upload] Writer:', '保存文件失败!')
      return ''
    return filename

  # 图片回收
  def HtmlImgClear(html: str, dir: str):
    # 全部图片
    imgs = Upload.GetHtmlFile(html)
    # 清理图片
    FileEo.Root = Env.root_dir
    all = FileEo.AllFile(dir)
    for val in all :
      if val not in imgs : FileEo.RemoveAll(dir+val)
    return True

  # 文件名-生成
  def GetFileName():
    d = time.strftime('%Y%m%d%H%M%S',time.localtime())
    t = datetime.datetime.now()
    n = str(t.microsecond)[2:5]
    rand = str(random.randint(0,255))
    return d + n + rand

  # 图片地址-获取HTML
  def GetHtmlFile(html: str):
    pattern = re.compile(r'<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>')
    match = pattern.findall(html)
    imgs = []
    for val in match:
      imgs += [os.path.basename(val)]
    return imgs