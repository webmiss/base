package webmis.library;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.multipart.MultipartFile;

import webmis.util.Util;

/* 文件类 */
public class FileEo {

  public static String Root="";

  /* 列表 */
  public static HashMap<String, Object> List(String path){
    // 路径
    path = path.equals("/") ? "" : Util.Trim(path, "/") + "/";
    path = path.replaceAll("\\.\\.|\\.\\/", "");
    // 数据
    HashMap<String, Object> res = new HashMap<String, Object>();
    ArrayList<HashMap<String, Object>> folder = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> files = new ArrayList<HashMap<String, Object>>();
    HashMap<String, Object> tmp;
    res.put("path", path);
    res.put("dirNum", 0);
    res.put("fileNum", 0);
    res.put("size", 0);
    res.put("folder", folder);
    res.put("files", files);
    // 是否文件夹
    String root = Root + path;
    File dir = new File(root);
    if (!dir.exists()) return res;
    // 文件夹&文件
    String ff;
    long size;
    long total = 0;
    String ctime;
    String mtime;
    String perm;
    File[] list = dir.listFiles();
    for (File f : list) {
      ff = root+"/"+f.getName();
      size = FileSize(f);
      total += size;
      ctime = GetCtime(ff);
      mtime = GetMtime(ff);
      perm = GetPerm(ff);
      if (f.isDirectory()) {
        tmp = new HashMap<String, Object>();
        tmp.put("name", f.getName());
        tmp.put("size", FormatBytes(size));
        tmp.put("ctime", ctime);
        tmp.put("mtime", mtime);
        tmp.put("perm", perm);
        folder.add(tmp);
        res.put("dirNum", Integer.valueOf(res.get("dirNum").toString())+1);
      } else {
        tmp = new HashMap<String, Object>();
        tmp.put("name", f.getName());
        tmp.put("size", FormatBytes(size));
        tmp.put("ctime", ctime);
        tmp.put("mtime", mtime);
        tmp.put("perm", perm);
        tmp.put("ext", GetExt(f.getName()));
        files.add(tmp);
        res.put("fileNum", Integer.valueOf(res.get("fileNum").toString())+1);
      }
      // 大小
      res.put("size", FormatBytes(total));
    }
    return res;
  }

  /* 全部文件 */
  public static ArrayList<String> AllFile(String path){
    ArrayList<String> res = new ArrayList<String>();
    // 是否文件夹
    String root = Root + path;
    File dir = new File(root);
    if (!dir.exists()) return res;
    // 文件夹&文件
    File[] list = dir.listFiles();
    for (File f : list) {
      if (f.isFile()) res.add(f.getName()); 
    }
    return res;
  }

  /* 统计大小 */
  public static Long FileSize(File ff){
    long total = 0;
    // 文件
    if(ff.isFile()) return ff.length();
    // 文件夹
    final File[] children = ff.listFiles();
    if (children!=null){
      for (final File child : children){
        total += FileSize(child);
      }
    }
    return total;
  }

  /* 创建时间 */
  public static String GetCtime(String ff) {
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      String t = String.valueOf(att.creationTime().toMillis());
      time = Util.Date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* 修改时间 */
  public static String GetMtime(String ff){
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      String t = String.valueOf(att.creationTime().toMillis());
      time = Util.Date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* 获取权限值 */
  public static String GetPerm(String ff) {
    File file = new File(ff);
    String str="";
    int perm = 0;
    if(file.canExecute()) perm+=1;
    if(file.canRead()) perm+=2;
    if(file.canWrite()) perm+=4;
    if(perm==7) str = "755";
    else if(perm==6) str = "644";
    else str = String.valueOf(perm);
    return str;
  }
  /* 文件后缀 */
  public static String GetExt(String fileName){
    return fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
  }

  /* 格式化 */
  public static String FormatBytes(Long bytes){
    String str;
    if(bytes >= 1073741824){
      str = String.format("%.2f GB", Float.valueOf(bytes.toString())/1073741824);
    }else if(bytes >= 1048576){
      str = String.format("%.2f MB", Float.valueOf(bytes.toString())/1048576);
    }else if(bytes >= 1024){
      str = String.format("%.2f KB", Float.valueOf(bytes.toString())/1024);
    }else{
      str = String.format("%.0f B", Float.valueOf(bytes.toString()));
    }
    return str;
  }

  /* 是否文件 */
  public static boolean IsFile(String file){
    file = Root+file;
    File obj = new File(file);
    return obj.isFile();
  }

  /* 创建目录 */
  public static boolean Mkdir(String path){
    path = Root+path;
    File dir = new File(path);
    if(!dir.isDirectory()) return dir.mkdirs();
    return true;
  }

  /* 重命名 */
  public static boolean Rename(String rename, String name){
    File src = new File(Root+rename);
    File dst = new File(Root+name);
    return src.renameTo(dst);
  }

  /* 上传 */
  public static boolean Upload(MultipartFile tmp, String to){
    to = Root+to;
    try {
      String root = System.getProperty("user.dir")+"/";
      File f = new File(root+to);
      tmp.transferTo(f);
      return true;
    }catch (IOException e){
      return false;
    }
  }

  /* 写入 */
  public static boolean Writer(String file, String content){
    return Writer(file, content.getBytes());
  }
  public static boolean Writer(String file, byte[] content){
    file = Root+file;
    FileOutputStream fos = null;
    BufferedOutputStream bos = null;
    try {
      File f = new File(file);
      fos = new java.io.FileOutputStream(f);
      bos = new BufferedOutputStream(fos);
      bos.write(content);
    } catch (Exception e) {
      System.out.println("写入文件: "+e.getMessage());
      return false;
    } finally {
      if (bos != null) try { bos.close(); } catch (IOException e) { }
      if (fos != null) try { fos.close(); } catch (IOException e) { }
    }
    return true;
  }

  /* 追加 */
  public static boolean WriterEnd(String file, String content){
    file = Root+file;
    try {
      FileWriter writer = new FileWriter(file, true);
      writer.write(content);
      writer.close();
    } catch (IOException e) {
      System.out.println("追加文件: "+e.getMessage());
      return false;
    }
    return true;
  }

  /* 读取 */
  public static byte[] Bytes(String file){
    byte[] bytes = null;
    FileInputStream fs = null;
    try{
      File ff = new File(Root+file);
      fs = new FileInputStream(ff);
      bytes = new byte[(int)ff.length()];
      fs.read(bytes);
      fs.close();
    }catch(IOException e){
      System.out.println("读取文件失败: "+e.getMessage());
    }finally{
      try { fs.close(); }catch(IOException e) { }
    }
    return bytes;
  }

  /* 删除(文件夹&文件) */
  public static void RemoveAll(String path){
    File obj = new File(Root+path);
    if(obj.isDirectory()){
      final File[] list = obj.listFiles();
      for (final File f : list){
        String ff = path+"/"+f.getName();
        if(f.isDirectory()) RemoveAll(ff);
        else f.delete();
      }
      // 空目录
      obj.delete();
    }else if(obj.isFile()){
      obj.delete();
    }
  }
}
