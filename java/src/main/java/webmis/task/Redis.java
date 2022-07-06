package webmis.task;

import java.util.List;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Env;
import webmis.library.FileEo;
import webmis.util.Util;

/* 日志 */
public class Redis extends Thread {

  @Override
  public void run() {
    Logs();
  }

  /* 消费者 */
  public void Logs() {
    // 是否记录
    while(true){
      webmis.library.Redis redis = new webmis.library.Redis("");
      List<String> data = redis.BLPop("logs", 10);
      redis.Close();
      if(data==null) continue;
      // 保存
      String msg = data.get(1);
      Boolean res = _logsWrite(msg);
      if(!res){
        System.out.println("[Logs] Write:"+"日志记录失败!");
        System.out.println(msg);
      }
    }
  }

  /* 写入 */
  private static boolean _logsWrite(String msg) {
    // 数据
    JSONObject data = Util.JsonDecode(msg);
    // 时间
    String ctime = Util.Date("");
    String year = ctime.substring(0,4);
    String month = ctime.substring(5,7);
    String day = ctime.substring(8,10);
    // 目录
    String name = data.get("type").toString();
    String path = "upload/logs/" + name + "/" + year + "/" + month + "/";
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(path)){
      System.out.println("[Upload] Mkdir: 创建目录失败!");
      return false;
    }
    // 追加
    String file = path + day + ".text";
    String content = Util.JsonEncode(data.get("data"));
    return FileEo.WriterEnd(file, "["+name+"] "+ctime+" "+content+"\n");
  }
  
}
