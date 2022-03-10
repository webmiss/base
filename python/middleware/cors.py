from flask.helpers import make_response

# 允许跨域请求
class Cors :

  def Init(res: any):
    res = make_response(res)
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Range, Content-Disposition, Content-Description'
    res.headers['Access-Control-Max-Age'] = '2592000'
    return res
