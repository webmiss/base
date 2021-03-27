import os
from config.env import Env

# 文件类
class FileEo:

  Root: str = Env.root_dir

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
