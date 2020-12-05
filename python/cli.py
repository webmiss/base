#!/bin/python
# -*- coding: UTF-8 -*-

import sys
import string
from app.Env import Env

# 模块、函数、参数
params = sys.argv
controller = params[1] if len(params)>1 else 'Main'
action = params[2] if len(params)>2 else 'main'
args = params[3:] if len(params)>3 else []

# 执行
try :
  controller = string.capwords(controller)+'Task'
  action = action+'Action'
  exec('from app.tasks.'+controller+' import *')
  if len(args)>0 : eval(controller+'().'+action+'(\''+'\',\''.join(args)+'\')')
  else : eval(controller+'().'+action+'()')
except Exception as e :
  if Env.debug : print(e)
