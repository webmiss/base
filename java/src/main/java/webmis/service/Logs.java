package webmis.service;

import webmis.config.Env;
import webmis.library.FileEo;

/* 日志 */
public class Logs extends Base {

  /* 写入文件 */
  public static void File(String file, String content) {
    FileEo.Root = Env.root_dir;
    FileEo.WriterEnd(file, content+"\n");
  }
  
}
