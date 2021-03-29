import os
import re
from util.util import Util

# 文件类
class FileEo:

  Root: str=''

  # 列表
  def List(path: str=''):
    # 路径
    path = '' if path=='/' else Util.Trim(path, '/')+'/'
    path = re.sub(r'\.\.|\.\\/', '', path)
    # 数据
    res = {'path': path, 'dirNum': 0, 'fileNum': 0, 'size': 0, 'folder': [], 'files': []}
    # 是否文件夹
    root = FileEo.Root+path
    if not os.path.isdir(root) : return res
    # 文件夹&文件
    list = os.listdir(root)
    for f in list :
      ff = root+'/'+f
      size = FileEo.FileSize(ff)
      res['size'] += size
      ctime = FileEo.GetCtime(ff)
      mtime = FileEo.GetMtime(ff)
      perm = FileEo.GetPerm(ff)
      if os.path.isdir(ff) :
        res['folder'] += [{'name':f,'size':FileEo.FormatBytes(size),'ctime':ctime,'mtime':mtime,'perm':perm}]
        res['dirNum'] += 1
      else :
        ext = FileEo.GetExt(f)
        res['files'] += [{'name':f,'size':FileEo.FormatBytes(size),'ctime':ctime,'mtime':mtime,'perm':perm,'ext':ext}]
        res['fileNum'] += 1
    # 大小
    res['size'] = FileEo.FormatBytes(res['size'])
    return res

  # 大小
  def FileSize(ff):
    total = 0
    # 文件
    if os.path.isfile(ff) :
      total += os.path.getsize(ff)
    elif os.path.isdir(ff) :
      # 文件夹
      list = os.listdir(ff)
      for f in list :
        total += FileEo.FileSize(ff+'/'+f)
    return total
  # 创建时间
  def GetCtime(ff):
    return Util.Date('%Y-%m-%d %H:%M:%S', os.path.getctime(ff))
  # 修改时间
  def GetMtime(ff):
    return Util.Date('%Y-%m-%d %H:%M:%S',os.path.getmtime(ff))
  # 获取权限值
  def GetPerm(ff):
    return oct(os.stat(ff).st_mode)[-3:]
  # 文件后缀
  def GetExt(fileName):
    return fileName.split('.')[-1:][0].lower()
  # 格式化
  def FormatBytes(bytes):
    if bytes >= 1073741824 :
      bytes = '%sGB'%(round(bytes*100/1073741824)/100)
    elif bytes >= 1048576 :
      bytes = '%sMB'%(round(bytes*100/1048576)/100)
    elif bytes >= 1024 :
      bytes = '%sKB'%(round(bytes*100/1024)/100)
    else :
      bytes = '%sB'%bytes
    return bytes

  # 创建目录
  def Mkdir(path: str=''):
    path = FileEo.Root+path
    if not os.path.exists(path) : os.makedirs(path)
    return True

  # 上传文件
  def Upload(tmp, to: str):
    to = FileEo.Root+to
    if tmp.save(to)==None : return True
    return False

  # 写入
  def Writer(file: str='', content: any=''):
    file = FileEo.Root+file
    with open(file,'wb') as f :
      f.write(content)
      f.close()
    return True

  # 删除(文件夹&文件)
  def RemoveAll(path: str=''):
    if path=='' : return False
    obj = FileEo.Root+path
    if os.path.isdir(obj) :
      # 文件夹
      list = os.listdir(obj)
      for f in list :
        ff = path+'/'+f
        if os.path.isdir(FileEo.Root+ff) : FileEo.delAll(ff)
        else : os.remove(FileEo.Root+ff)
      # 空目录
      os.removedirs(obj)
    elif os.path.isfile(obj) :
      os.remove(obj)
