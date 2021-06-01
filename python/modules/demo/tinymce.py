from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from library.upload import Upload
from util.url import Url

# TinyMCE编辑器
class Tinymce(Base) :

  ImgDir: str='upload/tinymce/'

  # 编辑
  def Edit(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    content = self.Post('content')
    content = Url.Decode(content)
    # 图片回收
    Upload.HtmlImgClear(content, self.ImgDir)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'content':Url.Encode(content)})

  # 图片
  def UpImg(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    base64 = self.Post('base64')
    if not base64 : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 上传
    img = Upload.Base64({'path':self.ImgDir, 'base64':base64})
    if not img : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'img':Data.Img(self.ImgDir+img)})