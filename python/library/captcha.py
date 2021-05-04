import random

class Captcha:

  __txtChars: str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  # 验证码
  def Vcode(self):
    code = self.GetCode(4)
    print(code, code.lower())
  
  # 获取号码
  def GetCode(self, num):
    code = random.sample(self.__txtChars, num)
    return ''.join(code)