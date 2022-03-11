package webmis.library;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSONObject;

import org.springframework.web.multipart.MultipartFile;

import webmis.config.Env;
import webmis.library.aliyun.Oss;
import webmis.util.Base64;
import webmis.util.Util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/* 上传类 */
@SuppressWarnings("unchecked")
public class Upload {

  //机器标识
  final static String machineId = String.valueOf(Env.machine_id);

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
    ArrayList<String> ct = Util.Explode(",", base64);
    if (ct.size() > 1) {
      param.put("ext", Base64.GetExt(ct.get(0)));
      base64 = ct.get(1);
    }
    // 创建目录
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(String.valueOf(param.get("path")))){
      System.out.println("[Upload] Mkdir: 创建目录失败!");
      return "";
    }
    // 文件名
    String filename;
    if(param.get("filename").equals("")) filename=GetFileName()+"."+param.get("ext").toString();
    else filename=param.get("filename").toString();
    // 保存文件
    if(!FileEo.Writer(String.valueOf(param.get("path"))+filename, Base64.Decode(base64.getBytes()))){
      System.out.println("[Upload] Writer: 保存文件失败!");
      return "";
    }
    return filename;
  }

  /* OSS-签名直传 */
  public static JSONObject OssPolicy(String ext, long expireTime) {
    // 类型
    ArrayList<String> extImg = new ArrayList<String>();
    extImg.add("jpg");
    extImg.add("png");
    extImg.add("gif");
    ArrayList<String> extVod = new ArrayList<String>();
    extVod.add("mp4");
    // 目录
    String dir = "tmp/";
    if(extImg.contains(ext)) dir = "img/";
    else if(extImg.contains(ext)) dir = "vod/";
    // 文件名
    String file = !ext.isEmpty()?GetFileName()+"."+ext:GetFileName();
    return Oss.Policy(dir, file, expireTime, 0);
  }

  /* OSS-签名验证 */
  public static Boolean OssPolicyVerify(JSONObject param) {
    String dir = param.containsKey("dir")?param.get("dir").toString():"";
    String file = param.containsKey("file")?param.get("file").toString():"";
    String expire = param.containsKey("expire")?param.get("expire").toString():"";
    String sign = param.containsKey("sign")?param.get("sign").toString():"";
    return Oss.PolicyVerify(dir, file, expire, sign);
  }

  /* 图片回收 */
  public static Boolean HtmlImgClear(String html, String dir) {
    // 全部图片
    ArrayList<String> imgs = GetHtmlFile(html);
    // 清理图片
    FileEo.Root = Env.root_dir;
    ArrayList<String> all = FileEo.AllFile(dir);
    for(String val:all) {
      if(!imgs.contains(val)) FileEo.RemoveAll(dir+val);
    }
    return true;
  }

  /* 文件名-生成 */
  static public String GetFileName() {
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
    LocalDateTime now = LocalDateTime.now();
    Random random = new Random();
    String randA = String.valueOf(random.nextInt(255));
    String randB = String.valueOf(random.nextInt(255));
    return df.format(now) + machineId + randA + randB;
  }

  /* 图片地址-获取HTML */
  static public ArrayList<String> GetHtmlFile(String html) {
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
    return imgs;
  }

}
