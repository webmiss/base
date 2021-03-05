#!/bin/python
# -*- coding: UTF-8 -*-

import string
import json
from app.Env import Env
from flask import Flask,request,make_response
import flask_cors

# 框架
app = Flask(__name__)
app.debug=Env.debug
# 允许跨域
flask_cors.CORS(app)

# 执行
def _start(m,c,a,p=[]):
  try :
    c = string.capwords(c)
    exec('from app.modules.'+m+'.'+c+'Controller import *')
    exec('obj = '+c+'Controller()')
    return eval('obj.'+a+'('+(','.join(list(filter(None,p))))+')')
  except Exception as e :
    if Env.devinfo :
      pass
    else :
      res = make_response(json.dumps({'code':5000,'msg':'%s'%(e)}))
      res.status = '200'
      res.headers['Access-Control-Allow-Origin'] = "*"
      res.headers['Access-Control-Allow-Methods'] = "*"
      res.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
      return res

# Home
@app.route('/',methods=['GET', 'POST'])
@app.route('/<c>',methods=['GET', 'POST'])
@app.route('/<c>/<a>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
def index(c='Index',a='index',p1='',p2='',p3=''):
  # 排除路由
  url = request.path.split('/',2)[1].lower()
  if(url not in Env.exclude): return _start('home',c,a,[p1,p2,p3])
  else: return ''

# Api
@app.route('/api',methods=['GET', 'POST'])
@app.route('/api/<c>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/api/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
def api(c='Index',a='index',p1='',p2='',p3=''):
  return _start('api',c,a,[p1,p2,p3])

# Admin
@app.route('/admin',methods=['GET', 'POST'])
@app.route('/admin/<c>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>',methods=['GET', 'POST'])
@app.route('/admin/<c>/<a>/<p1>/<p2>/<p3>',methods=['GET', 'POST'])
def admin(c='Index',a='index',p1='',p2='',p3=''):
  return _start('admin',c,a,[p1,p2,p3])

# 调试
if __name__ == '__main__':
  if(Env.debug): app.run(host='127.0.0.1',port=5000)
