from flask import Blueprint
from modules.admin.index import Index
from modules.admin.user import User
from modules.admin.user_info import UserInfo
from modules.admin.user_passwd import UserPasswd
from modules.admin.sys_file import SysFile
from modules.admin.sys_user import SysUser
from modules.admin.sys_menus import SysMenus

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET'])
def index() : return Index().Index()
@Admin.route('/index/getConfig',methods=['POST'])
def getConfig() : return Index().GetConfig()
# 登录
@Admin.route('/user/<a>',methods=['POST'])
def user(a) :
  if a=='login' : return User().Login()
  elif a=='token' : return User().Token()
# 个人资料
@Admin.route('/userinfo/<a>',methods=['POST'])
def userInfo(a) :
  if a=='list' : return UserInfo().List()
  elif a=='edit' : return UserInfo().Edit()
  elif a=='upimg' : return UserInfo().Upimg()
# 修改密码
@Admin.route('/userpasswd/<a>',methods=['POST'])
def userPasswd(a) :
  if a=='edit' : return UserPasswd().Edit()
# 文件管理
@Admin.route('/sysfile/<a>',methods=['POST'])
def sysFile(a) :
  if a=='list' : return SysFile().List()
  elif a=='mkdir' : return SysFile().Mkdir()
  elif a=='rename' : return SysFile().Rename()
  elif a=='upload' : return SysFile().Upload()
  elif a=='down' : return SysFile().Down()
  elif a=='remove' : return SysFile().Remove()
# 用户管理
@Admin.route('/sysuser/<a>',methods=['POST'])
def sysUser(a) :
  if a=='list' : return SysUser().List()
# 系统菜单
@Admin.route('/sysmenus/<a>',methods=['POST'])
def sysGetMenus(a) :
  if a=='getMenus' : return SysMenus().GetMenus()