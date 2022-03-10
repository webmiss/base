from model.model import Model

# 新闻分类
class WebNewsClass(Model) :

  # 构造函数
  def __init__(self):
    self.Table('web_news_class')
