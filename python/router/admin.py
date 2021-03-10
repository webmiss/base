from flask import Blueprint
from modules.admin.index import Index
from modules.admin.user import User

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET', 'POST'])
def index() : return Index().index()
@Admin.route('/index/getConfig',methods=['GET', 'POST'])
def getConfig() : return Index().getConfig()
@Admin.route('/user/login',methods=['GET', 'POST'])
def userLogin() : return User().login()