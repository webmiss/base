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

  /* Folders & Files */
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
      long t = Inc.time("yyyy-MM-dd","2020-10-21");
      System.out.println(t);
      data.put("size", formatBytes(total));
    }
    return data;
  }

  /* Size-String */
  public static Long size(String ff){
    File file = new File(ff);
    return fileSize(file);
  }
  /* Size-File */
  public static Long fileSize(File file){
    long total = 0;
    // File
    if(file.isFile()) return file.length();
    // Folder
    final File[] children = file.listFiles();
    if (children!=null){
      for (final File child : children){
        total += fileSize(child);
      }
    }
    return total;
  }
  
  /* File Perm */
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
  /* Ctime */
  public static String getCtime(String ff) {
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      long t = att.creationTime().toMillis();
      time = Inc.date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* Mtime */
  public static String getMtime(String ff){
    String time = "";
    try {
      BasicFileAttributes att = Files.readAttributes(Paths.get(ff), BasicFileAttributes.class);
      long t = att.creationTime().toMillis();
      time = Inc.date("yyyy-MM-dd hh:mm:ss",t);
    }catch(IOException e){ }
    return time;
  }
  /* File ext */
  public static String getExt(String fileName){
    return fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
  }

  /* Format Byte */
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
