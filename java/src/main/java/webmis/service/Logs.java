package webmis.service;

import com.alibaba.fastjson.JSONObject;

import webmis.library.Redis;
import webmis.util.Util;

/* 日志 */
public class Logs extends Base {

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
