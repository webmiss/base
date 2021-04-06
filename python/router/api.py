from flask import Blueprint
from modules.api.index import Index
from modules.api.user import User
from modules.api.demo import Demo

Api = Blueprint('api', __name__)

# 首页
@Api.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
# 登录
@Api.route('/user/<a>',methods=['POST'])
def user(a) :
  if a=='login' : return User().Login()
  elif a=='token' : return User().Token()
# 权限
@Api.route('/demo/<a>',methods=['POST'])
def demo(a) :
  if a=='token' : return Demo().Token()
  elif a=='list' : return Demo().List()
  elif a=='perm' : return Demo().Perm()
