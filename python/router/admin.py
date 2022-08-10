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
from modules.admin.web_news import WebNews
from modules.admin.web_news_class import WebNewsClass

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET'])
def index() : return Index().Index()
@Admin.route('/index/getChart',methods=['POST'])
def getChart() : return Index().GetChart()
# 登录
@Admin.route('/user/<a>',methods=['POST'])
def user(a) :
  if a=='login' : return User().Login()
  elif a=='token' : return User().Token()
# 个人资料
@Admin.route('/user_info/<a>',methods=['POST'])
def userInfo(a) :
  if a=='list' : return UserInfo().List()
  elif a=='edit' : return UserInfo().Edit()
  elif a=='upimg' : return UserInfo().Upimg()
# 修改密码
@Admin.route('/user_passwd/<a>',methods=['POST'])
def userPasswd(a) :
  if a=='edit' : return UserPasswd().Edit()
# 文件管理
@Admin.route('/sys_file/<a>',methods=['POST'])
def sysFile(a) :
  if a=='list' : return SysFile().List()
  elif a=='mkdir' : return SysFile().Mkdir()
  elif a=='rename' : return SysFile().Rename()
  elif a=='upload' : return SysFile().Upload()
  elif a=='down' : return SysFile().Down()
  elif a=='remove' : return SysFile().Remove()
# 用户管理
@Admin.route('/sys_user/<a>',methods=['POST'])
def sysUser(a) :
  if a=='list' : return SysUser().List()
  elif a=='add' : return SysUser().Add()
  elif a=='edit' : return SysUser().Edit()
  elif a=='del' : return SysUser().Del()
  elif a=='state' : return SysUser().State()
  elif a=='perm' : return SysUser().Perm()
  elif a=='info' : return SysUser().Info()
# API菜单
@Admin.route('/api_menus/<a>',methods=['POST'])
def apiMenus(a) :
  if a=='list' : return ApiMenus().List()
  elif a=='add' : return ApiMenus().Add()
  elif a=='edit' : return ApiMenus().Edit()
  elif a=='del' : return ApiMenus().Del()
  elif a=='perm' : return ApiMenus().Perm()
# API角色
@Admin.route('/api_role/<a>',methods=['POST'])
def sysRole(a) :
  if a=='list' : return ApiRole().List()
  elif a=='add' : return ApiRole().Add()
  elif a=='edit' : return ApiRole().Edit()
  elif a=='del' : return ApiRole().Del()
  elif a=='perm' : return ApiRole().Perm()
  elif a=='permList' : return ApiRole().PermList()
  elif a=='roleList' : return ApiRole().RoleList()
# 系统菜单
@Admin.route('/sys_menus/<a>',methods=['POST'])
def sysMenus(a) :
  if a=='list' : return SysMenus().List()
  elif a=='add' : return SysMenus().Add()
  elif a=='edit' : return SysMenus().Edit()
  elif a=='del' : return SysMenus().Del()
  elif a=='perm' : return SysMenus().Perm()
  elif a=='getMenusAll' : return SysMenus().GetMenusAll()
  elif a=='getMenusPerm' : return SysMenus().GetMenusPerm()
# 系统角色
@Admin.route('/sys_role/<a>',methods=['POST'])
def apiRole(a) :
  if a=='list' : return SysRole().List()
  elif a=='add' : return SysRole().Add()
  elif a=='edit' : return SysRole().Edit()
  elif a=='del' : return SysRole().Del()
  elif a=='perm' : return SysRole().Perm()
  elif a=='permList' : return SysRole().PermList()
  elif a=='roleList' : return SysRole().RoleList()
# 新闻
@Admin.route('/news/<a>',methods=['POST'])
def webNews(a) :
  if a=='list' : return WebNews().List()
  elif a=='add' : return WebNews().Add()
  elif a=='edit' : return WebNews().Edit()
  elif a=='del' : return WebNews().Del()
  elif a=='state' : return WebNews().State()
  elif a=='get_class' : return WebNews().GetClass()
  elif a=='get_content' : return WebNews().GetContent()
  elif a=='content' : return WebNews().Content()
  elif a=='up_img' : return WebNews().UpImg()
# 新闻-分类
@Admin.route('/news_class/<a>',methods=['POST'])
def webNewsClass(a) :
  if a=='list' : return WebNewsClass().List()
  elif a=='add' : return WebNewsClass().Add()
  elif a=='edit' : return WebNewsClass().Edit()
  elif a=='del' : return WebNewsClass().Del()
  elif a=='state' : return WebNewsClass().State()