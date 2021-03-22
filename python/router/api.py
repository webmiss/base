from flask import Blueprint
from modules.api.index import Index
from modules.api.user import User
from modules.api.demo import Demo

Api = Blueprint('api', __name__)

# 首页
@Api.route('/',methods=['GET', 'POST'])
def index() : return Index().index()
# 登录
@Api.route('/user/login',methods=['POST'])
def userLogin() : return User().Login()
@Api.route('/user/token',methods=['POST'])
def userToken() : return User().Token()
# 权限
@Api.route('/demo/token',methods=['POST'])
def demoToken() : return Demo().Token()
@Api.route('/demo/list',methods=['POST'])
def demoList() : return Demo().List()
@Api.route('/demo/perm',methods=['POST'])
def demoPerm() : return Demo().Perm()