import os
import re
from app.common.Inc import Inc

# 文件类
class Files:

  file_root = '.'

  # 列表(文件夹&文件)
  def lists(self,path='/'):
    # 路径
    path = '' if path=='/' else path.strip('/')+'/'
    path = re.sub(r'\.\.|\.\\/', '', path)
    # 参数
    data = {
      'path': path,
      'dirNum': 0,
      'fileNum': 0,
      'size': 0,
      'folder': [],
      'files': [],
    }
    # 是否文件夹
    root = self.file_root+path
    if not os.path.isdir(root) : return data
    # 文件夹&文件
    list = os.listdir(root)
    for f in list :
      ff = root+'/'+f
      size = self.fileSize(ff)
      data['size'] += size
      ctime = self.getCtime(ff)
      mtime = self.getMtime(ff)
      perm = self.getPerm(ff)
      if os.path.isdir(ff) :
        data['folder'] += [{'name':f,'size':self.formatBytes(size),'ctime':ctime,'mtime':mtime,'perm':perm}]
        data['dirNum'] += 1
      else :
        ext = self.getExt(f)
        data['files'] += [{'name':f,'size':self.formatBytes(size),'ctime':ctime,'mtime':mtime,'perm':perm,'ext':ext}]
        data['fileNum'] += 1
    # 大小
    data['size'] = self.formatBytes(data['size'])
    return data

  # 新建-文件夹
  def mkDir(self,path):
    dir = self.file_root+path
    if not os.path.isdir(dir) :
      return True if os.makedirs(dir)==None else False
    else :
      return False
  # 重命名
  def reName(self,rename,name):
    src = self.file_root+rename
    dst = self.file_root+name
    return True if os.rename(src,dst)==None else False

  # 删除(文件夹&文件)
  def delAll(self,path):
    obj = self.file_root+path
    if os.path.isdir(obj) :
      # 文件夹
      list = os.listdir(obj)
      for f in list :
        ff = path+'/'+f
        if os.path.isdir(self.file_root+ff) : self.delAll(ff)
        else : os.remove(self.file_root+ff)
      # 空目录
      os.removedirs(obj)
    elif os.path.isfile(obj) :
      os.remove(obj)

  # 大小(文件夹&文件)
  def fileSize(self,ff):
    total = 0
    # 文件
    if os.path.isfile(ff) :
      total += os.path.getsize(ff)
    elif os.path.isdir(ff) :
      # 文件夹
      list = os.listdir(ff)
      for f in list :
        total += self.fileSize(ff+'/'+f)
    return total


  # 获取权限值
  def getPerm(self,ff):
    return oct(os.stat(ff).st_mode)[-3:]
  # 创建时间
  def getCtime(self,ff):
    return Inc.date('%Y-%m-%d %H:%M:%S',os.path.getctime(ff))
  # 修改时间
  def getMtime(self,ff):
    return Inc.date('%Y-%m-%d %H:%M:%S',os.path.getmtime(ff))
  # 文件后缀
  def getExt(sefl,fileName):
    return fileName.split('.')[-1:][0].lower()

  # 格式化
  def formatBytes(self,bytes):
    if bytes >= 1073741824 :
      bytes = '%sGB'%(round(bytes*100/1073741824)/100)
    elif bytes >= 1048576 :
      bytes = '%sMB'%(round(bytes*100/1048576)/100)
    elif bytes >= 1024 :
      bytes = '%sKB'%(round(bytes*100/1024)/100)
    else :
      bytes = '%sB'%bytes
    return bytes
    
