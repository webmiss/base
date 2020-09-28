#!/bin/python
# -*- coding: UTF-8 -*-

import string
from config.env import Env
from flask import Flask
app = Flask(__name__)
app.debug=Env.debug

# Home
@app.route('/',methods=['GET', 'POST'])
@app.route('/<c>',methods=['GET', 'POST'])
@app.route('/<c>/',methods=['GET', 'POST'])
@app.route('/<c>/<a>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>/',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>/<p3>/',methods=['GET', 'POST'])
def index(c='Index',a='index',p1='',p2='',p3=''):
    return run('home',c,a,[p1,p2,p3])

# Api
@app.route('/api',methods=['GET', 'POST'])
@app.route('/api/',methods=['GET', 'POST'])
@app.route('/api/<c>',methods=['GET', 'POST'])
@app.route('/api/<c>/',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>/',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>/<p3>/',methods=['GET', 'POST'])
def api(c='Index',a='index',p1='',p2='',p3=''):
    return run('api',c,a,[p1,p2,p3])

# Admin
@app.route('/admin',methods=['GET', 'POST'])
@app.route('/admin/',methods=['GET', 'POST'])
@app.route('/admin/<c>',methods=['GET', 'POST'])
@app.route('/admin/<c>/',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>/',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>/<p3>/',methods=['GET', 'POST'])
def admin(c='Index',a='index',p1='',p2='',p3=''):
    return run('admin',c,a,[p1,p2,p3])

# 执行
def run(m,c,a,p=[]):
    c = string.capwords(c)
    # 加载模块
    exec('from modules.'+m+'.'+c+' import *')
    # 实例化
    exec('obj = '+c+'()')
    # 动作
    return eval('obj.'+a+'('+(','.join(list(filter(None,p))))+')')

# 404
@app.errorhandler(404)
def not_found(error):
    return '404: %s'%('没有该页面!')

# 调试
if __name__ == '__main__':
    if(Env.debug): app.run(host='127.0.0.1',port=5000)
