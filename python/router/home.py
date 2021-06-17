from flask import Blueprint
from modules.home.index import Index

Home = Blueprint('home', __name__)

# 首页
@Home.route('/',methods=['GET'])
def index() : return Index().Index()
@Home.route('/vcode',methods=['GET'])
def vcode() : return Index().Vcode()
@Home.route('/index/qrcode/<name>',methods=['GET'])
def indexQrcode(name) : return Index().Qrcode(name)
@Home.route('/ossCallback',methods=['POST'])
def indexOssCallback() : return Index().OssCallback()
