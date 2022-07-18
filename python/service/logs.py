from config.env import Env
from library.file_eo import FileEo

# 日志
class Logs:

  # 写入文件
  def File(file: str, content: str):
    FileEo.Root = Env.root_dir
    FileEo.WriterEnd(file, content+"\n")
