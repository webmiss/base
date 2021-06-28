package webmis.service;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Env;
import webmis.library.Redis;
import webmis.util.Os;
import webmis.util.Util;

/* 日志 */
public class Logs extends Base {

  /* 写入数据库 */
  public static void LogsDB(String ip, String method, String path, String user_agent) {
    // 数据
    String os = Os.System(user_agent);
    String browser = Os.Browser(user_agent);
    long time = Util.Time();
    // 模型
    webmis.model.Logs model = new webmis.model.Logs();
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("source", Env.log_source);
    data.put("ip", ip);
    data.put("os", os);
    data.put("browser", browser);
    data.put("ctime", time);
    data.put("method", method);
    data.put("url", path);
    data.put("user_agent", user_agent);
    model.Values(data);
    model.Insert();
  }

  /* 访问日志 */
  public static void Log(Object data) {
    JSONObject arr = new JSONObject();
    arr.put("type", "log");
    arr.put("data", data);
    String text = Util.JsonEncode(arr);
    Writer(text);
  }

  /* 信息日志 */
  public static void Info(Object data) {
    JSONObject arr = new JSONObject();
    arr.put("type", "info");
    arr.put("data", data);
    String text = Util.JsonEncode(arr);
    Writer(text);
  }

  /* 操作日志 */
  public static void Action(Object data) {
    JSONObject arr = new JSONObject();
    arr.put("type", "action");
    arr.put("data", data);
    String text = Util.JsonEncode(arr);
    Writer(text);
  }

  /* 错误日志 */
  public static void Error(Object data) {
    JSONObject arr = new JSONObject();
    arr.put("type", "error");
    arr.put("data", data);
    String text = Util.JsonEncode(arr);
    Writer(text);
  }

  /* 发送 */
  public static void Writer(String text) {
    Redis redis = new Redis("");
    redis.RPush("logs", text);
    redis.Close();
  }
  
}
