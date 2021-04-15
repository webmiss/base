import time
from flask import request
from config.env import Env
from service.logs import Logs as LogsService

# 日志
class Logs:

  # 访问日志
  def Init():
    # 是否记录
    if not Env.log_on : return
    # 数据
    LogsService.Log({
      'ip': request.remote_addr,
      'method': request.method,
      'path': request.path,
      'user_agent': request.headers.get("User-Agent"),
      'time': time.time(),
    })
