from config.aliyun import Aliyun
import oss2

# 对象存储
class Oss:

  OssConn = None              #连接
  AccessKeyId: str = ''       #RAM: AccessKeyId
  AccessKeySecret: str = ''   #RAM: AccessKeySecret
  Endpoint: str = ''          #地域节点
  Bucket: str = ''            #Bucket名称

  # 初始化
  def Init():
    # 配置
    ramCfg = Aliyun.RAM()
    ossCfg = Aliyun.OSS()
    if not Oss.AccessKeyId : Oss.AccessKeyId = ramCfg['AccessKeyId']
    if not Oss.AccessKeySecret : Oss.AccessKeySecret = ramCfg['AccessKeySecret']
    if not Oss.Endpoint : Oss.Endpoint = ossCfg['Endpoint']
    if not Oss.Bucket : Oss.Bucket = ossCfg['Bucket']
    # 连接
    if not Oss.OssConn :
      try:
        auth = oss2.Auth(Oss.AccessKeyId, Oss.AccessKeySecret)
        Oss.OssConn = oss2.Bucket(auth, Oss.Endpoint, Oss.Bucket)
      except Exception as e:
        print('[OSS] Conn:', e)
        Oss.OssConn = None
    return Oss.OssConn

  # 列表
  def ListObject(path: str):
    res = {'folder': [], 'file': []}
    # 连接
    conn = Oss.Init()
    if not conn : return res
    # 数据
    for val in oss2.ObjectIterator(conn, prefix = path, delimiter = '/'):
      if val.is_prefix(): res['folder'] += [val.key]
      else : res['file'] += [val.key]
    return res

  # 上传
  def PutObject(file: str, content, headers=None):
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.put_object(file, content, headers)
    return True

  # 删除-单个
  def DeleteObject(file: str):
    if len(file)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.delete_object(file)
    return True

  # 删除-多个
  def DeleteObjects(files: list):
    if len(files)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.batch_delete_objects(files)
    return True

  # 删除-文件夹&文件
  def DeleteObjectAll(path: str):
    if len(path)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 文件
    last = path[-1:]
    if last != '/' :
      conn.delete_object(path)
      return True
    # 文件夹
    objects = []
    lists = oss2.ObjectIterator(conn, prefix=path)
    for val in lists :
      objects += [val.key]
    return Oss.DeleteObjects(objects)
