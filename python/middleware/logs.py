import time
from flask import request
from config.env import Env
from service.logs import Logs as LogsService

# 日志
class Logs:

  # 访问日志
  def Init():
    # 参数
    ip = request.remote_addr
    method = request.method
    path = request.path
    user_agent = request.headers.get("User-Agent")
    # 写入-数据库
    if Env.log_db :
      LogsService.LogsDB(ip, method, path, user_agent)
    # 写入-文件
    if Env.log_file :
      LogsService.Log({
        'ip': ip,
        'method': method,
        'path': path,
        'user_agent': user_agent,
        'time': time.time(),
      })
