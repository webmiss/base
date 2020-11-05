import os

# 下载类
class Down:

  # Blob方式
  def fileBlob(self,path,filename):
    file = path+filename
    with open(file,'rb') as f: return f.read()
