from library.redis import Redis
from util.util import Util

# 日志
class Logs:

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
