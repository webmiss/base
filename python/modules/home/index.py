from service.base import Base
from config.env import Env
from library.file_eo import FileEo
from library.qrcode import Qrcode
from library.captcha import Captcha
from util.base64 import Base64

from library.aliyun.oss import Oss

from flask import send_file

class Index(Base) :

  # 首页
  def Index(self):
    object = 'mytest/python.png'
    content = 'iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAA9aVRYdENyZWF0aW9uIFRpbWUAAAAAADIwMjHlubQwNeaciDI05pelIOaYn+acn+S4gCAxN+aXtjQy5YiGMDjnp5IIYwcbAAADP0lEQVQ4jXWTu29cVRDGf3PO2fXu9d7NxvE7sYnZKMQExRQk6cApI1AqhJQGiYJ0/A00iJaakgIkHhKPAilFIoRIkCMSCWTsyNhOsPMgfqxj7+Pu7r3nDMXaQSkYaaQZab4ZfTPfyO5HZxSfosYCQm2nzWYXfOSotTwlB0UvjPRBpezAWshSRAwYi2YpDlVQaCWe1a4w+kaZmek++iIBBYCkEVif7zL/a5NqBEWnIAoagIDsfvyq7u11+Dt2nH2nRL5geIZ+zoR2K3D76zpTLaUUWTAGzVJMlgXuaeD85Zh8Qf6nQc8KkXDucpkVHwg+gCqiilnb6vLSpQqPVlLmfmyCSA+hsh/vu8DN7xs8Xu1y4mLMw60OBI8Gj2vGhsOuS/KkTvloERT2aoGNtZSn/wSOncqhCmNTOU5PeeTJDoVqzL2iZcLmEMD0jwuapLhuRtQXACgPWHZWHbn5Myxf62N40vXoGHBpgKC4IUvwCqo449vkqyPkq4ee4z/8omNv3TJUFawTuonyx2NHLlcmLAt0ugQPEjJc42GKNhIkjkAPlipMzij1YwvEAwYQth+n5LKEuGTYfODZXe3gTsSQCSZKSjz4bZvQaB3gAUUEyoMGsb187HiexBdodoskGwlHS9F+veCmBoXFn4VWfZORkxG1JGJoso94wO5fCVClVWuzsQLtRspwM89EVSDroD7Fic1jbYlb1wtMthJmZvP8dbvJcH+duGLQoNRrGYt3hph98xJPHz1h5+YNxDkQiyA4r9AoDvLWBxdZmLvK3WvbeG9Yqp+iXOnHZ4GdWsJrF6aJz17B/v4Z93+ae6YdBJwNKX6vTmnsJOfffoWwfp3gPcaa/8QrIAhh6StcSAhBwaegBw9oHUdcg7VfvmOiOgiqGGOeV7+Comj9IZoFMjWodYhYsAGDCM3UUK4U0aBsbbRIU9+bLtJTvsL2VkK3k+JyhsLYKEmndxkRg9EsI3ExlSMRjXqHbz//k/X7DWTkHM3K62Sjs7Q4zA9f3mV5cQNQxqtDbG4l4DPUZ7h2ZuifvoA9/S6HUd5/+T42HuXG1QVuffMFgnDl009478Pj2EMTSGGAkfE97swt8YK0QYR/ATsNfzHf0tKvAAAAAElFTkSuQmCC'
    res = Oss.PutObject(object, Base64.Decode(content))
    print(res)
    # 返回
    return self.GetJSON({'code':0,'msg':'Web'})

  # 验证码
  def Vcode(self):
    Captcha().Vcode()
    return ''

  # 二维码
  def Qrcode(self, name: str):
    text: str = ''
    if name=='docs' : text='https://webmis.vip/'
    elif name=='demo' : text='https://demo-app.webmis.vip/'
    elif name=='wechat' : text='http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK'
    elif name=='server1' : text='https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So'
    elif name=='server2' : text='https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo'
    # 创建目录
    path = 'upload/qrcode/'
    FileEo.Root = Env.root_dir
    if not FileEo.Mkdir(path): return
    # 是否生成
    file = path + name + '.png'
    if not FileEo.IsFile():
      ct = Qrcode.Create({'text': text})
      FileEo.Writer(file, ct)
    # 返回
    return send_file(Env.root_dir+file, mimetype='image/png')