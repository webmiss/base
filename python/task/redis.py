from task.base import Base
from config.env import Env
from config.redis import Redis as Cfg
from library.redis import Redis as RedisDB
from library.file_eo import FileEo
from util.util import Util

# 日志
class Redis(Base):

  # 消费者
  def Logs(self):
    while True :
      redis = RedisDB()
      data = redis.BLPop('logs', Cfg.Default()['timeout'])
      redis.Close()
      if not data : continue
      # 保存
      msg = data[1]
      res = self._logsWrite(msg)
      if not res :
        self.Print('[Logs] Write:', '日志记录失败!')
        self.Print(msg)

  # 日志-写入
  def _logsWrite(self, msg):
    # 数据
    data = Util.JsonDecode(msg)
    # 时间
    ctime = Util.Date('%Y-%m-%d')
    year = ctime[0:4]
    month = ctime[5:7]
    day = ctime[8:10]
    # 目录
    name = data['type']
    path = 'upload/logs/' + name + '/' + year + '/' + month + '/'
    FileEo.Root = Env.root_dir
    if not FileEo.Mkdir(path) :
      print('[Logs] Mkdir:', '创建目录失败!')
      return False
    # 追加
    file = path + day + '.text'
    content = Util.JsonEncode(data['data'])
    res = FileEo.WriterEnd(file, '['+name+'] '+ctime+' '+content+"\n")
    if not res : return False
    return True

