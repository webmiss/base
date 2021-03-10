from flask import Flask,request,make_response
import flask_cors
from config.env import Env
from router.home import Home
from router.api import Api
from router.admin import Admin

# 配置
app = Flask(__name__)
app.debug=Env.debug
# 允许跨域
flask_cors.CORS(app)

# 路由
app.register_blueprint(Home, url_prefix="")
app.register_blueprint(Api, url_prefix="/api")
app.register_blueprint(Admin, url_prefix="/admin")


# 运行
if __name__ == '__main__':
  if(Env.debug): app.run(host=Env.host,port=Env.port)
