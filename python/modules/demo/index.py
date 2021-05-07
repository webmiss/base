from service.base import Base
from library.tencent.im import Im

class Index(Base) :

  # 首页
  def Index(self):
    userSig = Im().UserSig(123456)
    return self.GetJSON({'code':0,'msg':'Demo'})