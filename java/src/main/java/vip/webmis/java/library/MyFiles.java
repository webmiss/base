package vip.webmis.java.library;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.HashMap;

import vip.webmis.java.common.Inc;

/* 文件类 */
public class MyFiles {

  public static String file_root = ".";

  /* 列表(文件夹&文件) */
  public static HashMap<String, Object> lists(String path) {
    HashMap<String, Object> data = new HashMap<String, Object>();
    // 路径
    path = path.equals("/") ? "" : Inc.trim(path, "/") + "/";
    path = path.replaceAll("\\.\\.|\\.\\/", "");
    // 参数
    ArrayList<HashMap<String, Object>> folder = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> files = new ArrayList<HashMap<String, Object>>();
    HashMap<String, Object> tmp;
    data.put("path", path);
    data.put("dirNum", 0);
    data.put("fileNum", 0);
    data.put("size", 0);
    data.put("folder", folder);
    data.put("files", files);
    // 是否文件夹
    String ff;
    long size;
    long total = 0;
    String ctime;
    String mtime;
    String perm;
    String root = file_root + path;
    File dir = new File(root);
    if (!dir.exists())
      return data;
    // 文件夹&文件
    File[] list = dir.listFiles();
    for (File f : list) {
      ff = root+"/"+f.getName();
      size = fileSize(f);
      total += size;
      ctime = getCtime(ff);
      mtime = getMtime(ff);
      perm = getPerm(ff);
      if (f.isDirectory()) {
        tmp = new HashMap<String, Object>();
        tmp.put("name", f.getName());
        tmp.put("size", formatBytes(size));
        tmp.put("ctime", ctime);
        tmp.put("mtime", mtime);
        tmp.put("perm", perm);
        folder.add(tmp);
        data.put("dirNum", Integer.valueOf(data.get("dirNum").toString())+1);
      } else {
        tmp = new HashMap<String, Object>();
        tmp.put("name", f.getName());
        tmp.put("size", formatBytes(size));
        tmp.put("ctime", ctime);
        tmp.put("mtime", mtime);
        tmp.put("perm", perm);
        tmp.put("ext", getExt(f.getName()));
        files.add(tmp);
        data.put("fileNum", Integer.valueOf(data.get("fileNum").toString())+1);
      }
      // 大小
      data.put("size", formatBytes(total));
    }
    return data;
  }

  /* 新建-文件夹 */
  public static boolean mkDir(String path){
    File dir = new File(file_root+path);
    if(!dir.isDirectory()){
      return dir.mkdirs();
    }else{
      return false;
    }
  }

  /* 重命名 */
  public static boolean reName(String rename, String name){
    File src = new File(file_root+rename);
    File dst = new File(file_root+name);
    return src.renameTo(dst);
  }


  /* 删除(文件夹&文件) */
  public static void delAll(String path){
    File obj = new File(file_root+path);
    if(obj.isDirectory()){
      final File[] list = obj.listFiles();
      for (final File f : list){
        String ff = path+"/"+f.getName();
        if(f.isDirectory()) delAll(ff);
        else f.delete();
      }
      // 空目录
      obj.delete();
    }else if(obj.isFile()){
      obj.delete();
    }
  }

  /* 大小(文件夹&文件) */
  public static Long size(String ff){
    File file = new File(ff);
    return fileSize(file);
  }
  /* 大小(文件夹&文件) */
  public static Long fileSize(File file){
    long total = 0;
    // 文件
    if(file.isFile()) return file.length();
    // 文件夹
    final File[] children = file.listFiles();
    if (children!=null){
      for (final File child : children){
        total += fileSize(child);
      }
    }
    return total;
  }
  
  /* 获取权限值 */
  public static String getPerm(String ff) {
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
  /* 创建时间 */
  public static String getCtime(String ff) {
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      long t = att.creationTime().toMillis();
      time = Inc.date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* 修改时间 */
  public static String getMtime(String ff){
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      long t = att.creationTime().toMillis();
      time = Inc.date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* 文件后缀 */
  public static String getExt(String fileName){
    return fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
  }

  /* 格式化 */
  public static String formatBytes(Long bytes){
    String str;
    double tmp;
    if(bytes >= 1073741824){
      tmp = Double.valueOf(Math.round(bytes*100/1073741824))/100;
      str = String.format("%sGB",tmp);
    }else if(bytes >= 1048576){
      tmp = Double.valueOf(Math.round(bytes*100/1048576))/100;
      str = String.format("%sMB",tmp);
    }else if(bytes >= 1024){
      tmp = Double.valueOf(Math.round(bytes*100/1024))/100;
      str = String.format("%sKB",tmp);
    }else{
      str = String.format("%sB",bytes);
    }
    return str;
  }
  
}
