from flask import Blueprint
from modules.admin.index import Index
from modules.admin.user import User
from modules.admin.user_info import UserInfo
from modules.admin.user_passwd import UserPasswd
from modules.admin.sys_file import SysFile
from modules.admin.sys_user import SysUser
from modules.admin.api_menus import ApiMenus
from modules.admin.api_role import ApiRole
from modules.admin.sys_menus import SysMenus
from modules.admin.sys_role import SysRole
from modules.admin.sys_config import SysConfig

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET'])
def index() : return Index().Index()
@Admin.route('/index/getConfig',methods=['GET'])
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
  elif a=='add' : return SysUser().Add()
  elif a=='edit' : return SysUser().Edit()
  elif a=='del' : return SysUser().Del()
  elif a=='state' : return SysUser().State()
  elif a=='perm' : return SysUser().Perm()
  elif a=='info' : return SysUser().Info()
# API菜单
@Admin.route('/apimenus/<a>',methods=['POST'])
def apiMenus(a) :
  if a=='list' : return ApiMenus().List()
  elif a=='add' : return ApiMenus().Add()
  elif a=='edit' : return ApiMenus().Edit()
  elif a=='del' : return ApiMenus().Del()
  elif a=='perm' : return ApiMenus().Perm()
# API角色
@Admin.route('/apirole/<a>',methods=['POST'])
def sysRole(a) :
  if a=='list' : return ApiRole().List()
  elif a=='add' : return ApiRole().Add()
  elif a=='edit' : return ApiRole().Edit()
  elif a=='del' : return ApiRole().Del()
  elif a=='perm' : return ApiRole().Perm()
  elif a=='permList' : return ApiRole().PermList()
  elif a=='roleList' : return ApiRole().RoleList()
# 系统菜单
@Admin.route('/sysmenus/<a>',methods=['POST'])
def sysMenus(a) :
  if a=='list' : return SysMenus().List()
  elif a=='add' : return SysMenus().Add()
  elif a=='edit' : return SysMenus().Edit()
  elif a=='del' : return SysMenus().Del()
  elif a=='perm' : return SysMenus().Perm()
  elif a=='getMenus' : return SysMenus().GetMenus()
# 系统角色
@Admin.route('/sysrole/<a>',methods=['POST'])
def apiRole(a) :
  if a=='list' : return SysRole().List()
  elif a=='add' : return SysRole().Add()
  elif a=='edit' : return SysRole().Edit()
  elif a=='del' : return SysRole().Del()
  elif a=='perm' : return SysRole().Perm()
  elif a=='permList' : return SysRole().PermList()
  elif a=='roleList' : return SysRole().RoleList()
# 系统配置
@Admin.route('/sysconfig/<a>',methods=['POST'])
def sysConfig(a) :
  if a=='list' : return SysConfig().List()
  elif a=='edit' : return SysConfig().Edit()
  elif a=='upimg' : return SysConfig().Upimg()