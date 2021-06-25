from flask import Flask
from flask.helpers import make_response
from werkzeug.exceptions import HTTPException
import json
from flask_cors import CORS

from config.env import Env
from middleware.logs import Logs
from router.api import Api
from router.admin import Admin
from router.home import Home
from router.demo import Demo

# 配置
app = Flask(__name__)
app.debug=Env.debug
# 允许跨域请求
CORS(app, supports_credentials=True)

# 响应
@app.after_request
def After(res):
  res = make_response(res)
  res.headers['Access-Control-Allow-Origin'] = '*'
  res.headers['Access-Control-Allow-Methods'] = '*'
  res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
  res.headers['Access-Control-Max-Age'] = '2592000'
  return res

# 中间件
@app.before_request
def Before():
  # 访问日志
  Logs.Init()

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
app.register_blueprint(Demo, url_prefix="/demo")

# 运行
if __name__ == '__main__':
  # 启动
  app.run(host=Env.host,port=Env.port)
