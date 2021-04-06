from flask import Blueprint
from modules.home.index import Index

Home = Blueprint('home', __name__)

# 首页
@Home.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
