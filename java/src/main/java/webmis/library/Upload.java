package webmis.library;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.multipart.MultipartFile;

import webmis.config.Env;
import webmis.util.Util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/* 上传类 */
@SuppressWarnings("unchecked")
public class Upload {

  /* 单文件 */
  public static String File(MultipartFile file, HashMap<String, Object> params) {
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path", "upload/");   //上传目录
    param.put("filename", "");      //文件名
    ArrayList<String> bind = new ArrayList<String>();
    bind.add("svg");
    bind.add("jpg");
    bind.add("jpeg");
    bind.add("png");
    bind.add("gif");
    bind.add("mov");
    bind.add("mp4");
    bind.add("wav");
    bind.add("mp3");
    param.put("bind", bind);         //允许格式
    param = Util.ArrayMerge(param, params);
    // 限制格式
    String fileName = file.getOriginalFilename();
    String ext = FileEo.GetExt(fileName);
    if(param.get("bind") != null) {
      if(!bind.contains(ext)){
        System.out.println("只支持" + Util.Implode(",", bind) + "格式!");
        return "";
      }
    }
    // 是否重命名
    param.put("filename", param.get("filename").equals("")?fileName:param.get("filename").toString()+"."+ext);
    // 创建目录
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(String.valueOf(param.get("path")))){
      System.out.println("[Upload] Mkdir: 创建目录失败!");
      return "";
    }
    // 保存文件
    if(!FileEo.Upload(file, param.get("path").toString()+param.get("filename").toString())){
      System.out.println("[Upload] Upload: 保存文件失败!");
      return "";
    }
    return param.get("filename").toString();
  }

  /* Base64 */
  public static String Base64(HashMap<String, Object> params) {
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path", "upload/"); //上传目录
    param.put("base64", "");      //文件内容
    param.put("filename", "");    //文件名
    param.put("ext", "png");      //后缀
    param = Util.ArrayMerge(param, params);
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
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(String.valueOf(param.get("path")))){
      System.out.println("[Upload] Mkdir: 创建目录失败!");
      return "";
    }
    // 文件名
    String filename;
    if(param.get("filename").equals("")) filename=_getName()+"."+param.get("ext").toString();
    else filename=param.get("filename").toString();
    // 保存文件
    if(!FileEo.Writer(String.valueOf(param.get("path"))+filename, Base64.getDecoder().decode(base64))){
      System.out.println("[Upload] Writer: 保存文件失败!");
      return "";
    }
    return filename;
  }

  /* 图片回收 */
  public static Boolean HtmlImgClear(String html, String dir) {
    String img = "";
    String[] url;
    Pattern pattern = Pattern.compile("<img.*?src=[\'|\"](.*?)[\'|\"].*?[\\/]?>");
    Matcher match = pattern.matcher(html);
    ArrayList<String> imgs = new ArrayList<>();
    while (match.find()) {
      img = match.group();
      // src数据
      Matcher m = Pattern.compile("src\\s*=\\s*\"?(.*?)(\"|>|\\s+)").matcher(img);
      while (m.find()) {
        url = m.group(1).split("/");
        imgs.add(url[url.length-1]);
      }
    }
    // 清理图片
    FileEo.Root = Env.root_dir;
    ArrayList<String> all = FileEo.AllFile(dir);
    for(String val:all) {
      if(!imgs.contains(val)) FileEo.RemoveAll(dir+val);
    }
    return true;
  }

  /* 获取名称 */
  private static String _getName(){
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSS");
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }

}
