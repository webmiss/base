from base.base import Base
from model.demo import Demo

class Index(Base) :

  # 首页
  def index(self):
    # 查询
    demo = Demo()
    demo.Columns('uid','title')
    demo.Where('title LIKE %s','%事务%')
    data = demo.Find()
    # 添加
    demo.Values({'uid': None, 'title':'添加'})
    id = demo.Insert()
    self.Print(id)
    # 更新
    demo.Set({'title':'Python-更新'})
    demo.Where('uid=%s', id)
    num = demo.Update()
    self.Print(num)
    # 删除
    demo.Where('uid=%s', id)
    num = demo.Delete()
    self.Print(num)
    # 返回
    return self.getJSON({'code':0,'msg':'Web', 'data':data})