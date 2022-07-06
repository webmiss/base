from flask import Blueprint
from modules.api.index import Index
from modules.api.user import User

Api = Blueprint('api', __name__)

# 首页
@Api.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
# 登录
@Api.route('/user/<a>',methods=['POST'])
def user(a) :
  if a=='login' : return User().Login()
  elif a=='token' : return User().Token()

