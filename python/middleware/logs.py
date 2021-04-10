import time
from flask import request
from service.logs import Logs as LogsService

# 日志
class Logs:

  # 访问日志
  def Init():
    LogsService.Log({
      'ip': request.remote_addr,
      'method': request.method,
      'path': request.path,
      'user_agent': request.headers.get("User-Agent"),
      'time': time.time(),
    })
