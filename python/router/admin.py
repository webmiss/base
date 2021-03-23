from flask import Blueprint
from modules.admin.index import Index
from modules.admin.user import User
from modules.admin.user_info import UserInfo
from modules.admin.sys_menus import SysMenus

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET'])
def index() : return Index().Index()
@Admin.route('/index/getConfig',methods=['POST'])
def getConfig() : return Index().GetConfig()
# 登录
@Admin.route('/user/login',methods=['POST'])
def userLogin() : return User().Login()
@Admin.route('/user/token',methods=['POST'])
def userToken() : return User().Token()
# 个人资料
@Admin.route('/userinfo/list',methods=['POST'])
def userInfoList() : return UserInfo().List()
@Admin.route('/userinfo/edit',methods=['POST'])
def userInfoEdit() : return UserInfo().Edit()
# 系统菜单
@Admin.route('/Sysmenus/getMenus',methods=['POST'])
def sysGetMenus() : return SysMenus().GetMenus()