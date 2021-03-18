from config.env import Env


# 数据类
class Data:

  # 图片地址
  def img(img: str):
    return Env.base_url+img if img!='' else ''