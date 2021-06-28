from config.env import Env
from library.redis import Redis
from util.util import Util
from util.os import Os
from model.logs import Logs as LogsModel

# 日志
class Logs:

  # 写入数据库
  def LogsDB(ip: str, method: str, path: str, user_agent: str):
    # 数据
    os = Os.System(user_agent)
    browser = Os.Browser(user_agent)
    time = Util.Time()
    # 模型
    model = LogsModel()
    model.Values({
      'source': Env.log_source,
      'ip': ip,
      'os': os,
      'browser': browser,
      'ctime': time,
      'method': method,
      'url': path,
      'user_agent': user_agent,
    })
    model.Insert()

  # 访问日志
  def Log(data):
    text = Util.JsonEncode({'type':'log', 'data':data})
    Logs.Writer(text)

  # 信息日志
  def Info(data):
    text = Util.JsonEncode({'type':'info', 'data':data})
    Logs.Writer(text)

  # 操作日志
  def Action(data):
    text = Util.JsonEncode({'type':'action', 'data':data})
    Logs.Writer(text)

  # 错误日志
  def Error(data):
    text = Util.JsonEncode({'type':'error', 'data':data})
    Logs.Writer(text)

  # 发送
  def Writer(text: str):
    redis = Redis()
    redis.RPush('logs', text)
    redis.Close()
