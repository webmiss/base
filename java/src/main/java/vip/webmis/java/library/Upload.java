package vip.webmis.java.library;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/* 上传类 */
public class Upload {

  /* Base64上传 */
  public static HashMap<String, Object> base64(HashMap<String, Object> data) {
    HashMap<String, Object> res = new HashMap<String, Object>();
    // 参数
    HashMap<String, Object> def = new HashMap<String, Object>();
    def.put("path", "upload/"); // 上传路径
    def.put("base64", ""); // 文件内容
    def.put("filename", ""); // 文件名
    def.put("ext", "png"); // 后缀
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.putAll(def);
    param.putAll(data);
    // 内容
    String base64 = String.valueOf(param.get("base64"));
    // 否有类型
    String[] ct = base64.split(",");
    if (ct.length > 1) {
      if (ct[0].equals("data:image/jpeg;base64"))
        param.put("ext", "jpg");
      else if (ct[0].equals("data:image/png;base64"))
        param.put("ext", "png");
      else if (ct[0].equals("data:image/gif;base64"))
        param.put("ext", "gif");
      base64 = ct[1];
    }
    // 创建目录
    File dir = new File(String.valueOf(param.get("path")));
    if (!dir.exists())
      dir.mkdirs();
    // 文件名
    String filename = param.get("filename").equals("") ? _getName() + "." + String.valueOf(param.get("ext"))
        : String.valueOf(param.get("filename"));
    // 保存文件
    FileOutputStream fos = null;
    BufferedOutputStream bos = null;
    try {
      byte[] bytes = Base64.getDecoder().decode(base64);
      File file = new File(String.valueOf(param.get("path")) + filename);
      fos = new java.io.FileOutputStream(file);
      bos = new BufferedOutputStream(fos);
      bos.write(bytes);
      res.put("filename",filename);
    } catch (Exception e) {
      System.out.println("写入文件: "+e.getMessage());
    } finally {
      if (bos != null) try { bos.close(); } catch (IOException e) { }
      if (fos != null) try { fos.close(); } catch (IOException e) { }
    }
    // 结果
    return res;
  }

  /* 获取名称 */
  private static String _getName(){
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yMdHmsSSSS");
    LocalDateTime now = LocalDateTime.now();
    String d = df.format(now);
    return d;
  }

}
