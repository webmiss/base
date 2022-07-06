import json
from flask import Flask
from flask.helpers import make_response
from werkzeug.exceptions import HTTPException
from flask_cors import CORS
from middleware.cors import Cors

from config.env import Env
from router.api import Api
from router.admin import Admin
from router.home import Home

# 配置
app = Flask(__name__)
app.debug=Env.debug
# 允许跨域请求
CORS(app, supports_credentials=True)

# 中间件
# @app.before_request
# def Before():

# 响应
@app.after_request
def After(res):
  return Cors.Init(res)

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
