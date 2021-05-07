from flask import Blueprint
from modules.demo.index import Index

Demo = Blueprint('demo', __name__)

# 首页
@Demo.route('/',methods=['GET', 'POST'])
def index() : return Index().Index()
