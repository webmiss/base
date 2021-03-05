from flask import Blueprint
from modules.admin.index import Index

Admin = Blueprint('admin', __name__)

# 首页
@Admin.route('/',methods=['GET', 'POST'])
def index() : return Index().index()