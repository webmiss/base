#!/bin/python
# -*- coding: UTF-8 -*-
import sys
import string

# 参数
param = sys.argv
args = {}
args['c'] = param[1] if len(param)>1 else 'main'
args['a'] = param[2] if len(param)>2 else 'main'
args['p'] = param[3] if len(param)>3 else ''

# 路由
controller = string.capwords(args['c'])
action = string.capwords(args['a'])
try :
  exec('from task.'+args['c'].lower()+' import '+controller)
  if args['p'] == '' : eval(controller+'().'+action+'()')
  else : eval(controller+'().'+action+'('+args['p']+')')
except Exception as e :
  print('[Cli]', e)