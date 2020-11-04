package vip.webmis.java.library;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import vip.webmis.java.common.Inc;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/* 上传类 */
public class Upload {

  /* 单文件上传 */
  public static HashMap<String, Object> file(MultipartFile file, HashMap<String, Object> params) {
    HashMap<String, Object> res = null;
    // 参数
    ArrayList<String> bind = new ArrayList<String>();
    bind.add("jpg");
    bind.add("jpeg");
    bind.add("png");
    bind.add("gif");
    bind.add("mov");
    bind.add("mp4");
    bind.add("wav");
    bind.add("mp3");
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("path", "upload/"); // 上传目录
    cfg.put("filename", ""); // 文件名
    cfg.put("bind", bind); // 允许格式
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.putAll(cfg);
    param.putAll(params);
    // 文件
    String fileName = file.getOriginalFilename();
    // 限制格式
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    if (param.get("bind") != null) {
      JSONArray arr = JSON.parseArray(JSON.toJSONString(param.get("bind")));
      if (!arr.contains(ext)) {
        res = new HashMap<String, Object>();
        res.put("state", false);
        res.put("msg", "只支持" + Inc.implode(",", arr) + "格式!");
      }
    }
    // 是否重命名
    if (param.get("filename").equals(""))
      param.put("filename", fileName);
    // 创建目录
    File dir = new File(String.valueOf(param.get("path")));
    if (!dir.exists())
      dir.mkdirs();
    // 保存文件
    try {
      String root = System.getProperty("user.dir")+"/";
      File f = new File(root+param.get("path").toString()+param.get("filename").toString());
      file.transferTo(f);
      res = new HashMap<String, Object>();
      res.put("state",true);
      res.put("filename",param.get("filename"));
    }catch (IOException e){
      res = new HashMap<String, Object>();
      res.put("state",false);
      res.put("msg",e.getMessage());
    }
    return res;
  }

  /* Base64上传 */
  public static HashMap<String, Object> base64(HashMap<String, Object> params) {
    HashMap<String, Object> res = null;
    // 参数
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("path", "upload/"); //上传目录
    cfg.put("base64", ""); //文件内容
    cfg.put("filename", ""); //文件名
    cfg.put("ext", "png"); //后缀
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.putAll(cfg);
    param.putAll(params);
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
    if (!dir.exists()) dir.mkdirs();
    // 文件名
    String filename = param.get("filename").equals("")?_getName()+"."+String.valueOf(param.get("ext")):String.valueOf(param.get("filename"));
    // 保存文件
    FileOutputStream fos = null;
    BufferedOutputStream bos = null;
    try {
      byte[] bytes = Base64.getDecoder().decode(base64);
      File file = new File(String.valueOf(param.get("path"))+filename);
      fos = new java.io.FileOutputStream(file);
      bos = new BufferedOutputStream(fos);
      bos.write(bytes);
      res = new HashMap<String, Object>();
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
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSS");
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }

}
