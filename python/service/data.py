from config.env import Env


# 数据类
class Data:

  # 生成ID
  def GetId():
    
    return '2012'

  # 图片地址
  def Img(img: str):
    return Env.base_url+img if img!='' else ''