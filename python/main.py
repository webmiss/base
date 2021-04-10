from flask import Flask
from werkzeug.exceptions import HTTPException
import json
import flask_cors

from config.env import Env
from middleware.logs import Logs
from router.home import Home
from router.api import Api
from router.admin import Admin

# 配置
app = Flask(__name__)
app.debug=Env.debug

# 中间件
@app.before_request
def Before():
  flask_cors.CORS(app)  #允许跨域请求
  Logs.Init()           #访问日志

# 错误返回
@app.errorhandler(HTTPException)
def handle_exception(e):
  response = e.get_response()
  response.data = json.dumps({"code": e.code, "msg": e.name, "err": e.description,})
  response.content_type = "application/json"
  return response, 200

# 路由
app.register_blueprint(Home, url_prefix="")
app.register_blueprint(Api, url_prefix="/api")
app.register_blueprint(Admin, url_prefix="/admin")

# 运行
if __name__ == '__main__':
  # 启动
  app.run(host=Env.host,port=Env.port)
