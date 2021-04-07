from flask import Blueprint
from modules.home.index import Index

Home = Blueprint('home', __name__)

# 首页
@Home.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
@Home.route('/index/qrcode/<name>',methods=['GET', 'POST'])
def indexQrcode(name) : return Index().Qrcode(name)
