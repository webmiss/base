from flask import Blueprint
from modules.demo.index import Index
from modules.demo.tinymce import Tinymce
from modules.demo.tweblive import Tweblive

Demo = Blueprint('demo', __name__)

# 首页
@Demo.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
# TinyMCE
@Demo.route('/tinymce/<a>',methods=['POST'])
def tinymce(a) :
  if a=='edit' : return Tinymce().Edit()
  elif a=='upImg' : return Tinymce().UpImg()
# TWebLive
@Demo.route('/tweblive/<a>',methods=['POST'])
def tweblive(a) :
  if a=='list' : return Tweblive().List()
  elif a=='userInfo' : return Tweblive().UserInfo()
