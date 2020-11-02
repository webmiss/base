import os
import re
from app.common.Inc import Inc

# 文件类
class Files:

  file_root = '.'

  # Folders & Files
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
      size = os.path.getsize(ff)
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

  # File Perm
  def getPerm(self,ff):
    return oct(os.stat(ff).st_mode)[-3:]
  # Ctime
  def getCtime(self,ff):
    return Inc.date('%Y-%m-%d %H:%M:%S',os.path.getctime(ff))
  # Mtime
  def getMtime(self,ff):
    return Inc.date('%Y-%m-%d %H:%M:%S',os.path.getmtime(ff))
  # File ext
  def getExt(sefl,fileName):
    return fileName.split('.')[-1:][0].lower()

  # Format Byte
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
    
