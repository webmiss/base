import qrcode
import zxing
from io import BytesIO
from util.util import Util

# 二维码类
class Qrcode:

  # 生成
  def Create(params={}):
    # 参数
    param = Util.ArrayMerge({
      'text': '',     #内容
      'size': 5,      #大小
      'border': 2,    #边距
    }, params)
    # 生成
    qr = qrcode.QRCode(
      version = 1,
      error_correction = qrcode.constants.ERROR_CORRECT_H,
      box_size = param['size'],
      border = param['border']
    )
    qr.add_data(param['text'])
    img = qr.make_image()
    byte = BytesIO()
    img.save(byte, 'PNG')
    return byte.getvalue()

  # 识别
  def Scan(file):
    reader = zxing.BarCodeReader()
    return reader.decode(file)
