from flask import Blueprint
from modules.api.index import Index

Api = Blueprint('api', __name__)

# 首页
@Api.route('/',methods=['GET', 'POST'])
def index() : return Index().index()