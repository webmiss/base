package webmis.library;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import webmis.config.Env;

/* 文件类 */
public class FileEo {

  public static String Root=Env.root_dir;

  /* 创建目录 */
  public static boolean Mkdir(String path){
    path = Root+path;
    File dir = new File(path);
    if(!dir.exists()) return dir.mkdirs();
    return true;
  }

  /* 上传文件 */
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
  public static boolean Writer(String file, byte[] content){
    file = Root+file;
    FileOutputStream fos = null;
    BufferedOutputStream bos = null;
    try {
      File f = new File(file);
      fos = new java.io.FileOutputStream(f);
      bos = new BufferedOutputStream(fos);
      bos.write(content);
      return true;
    } catch (Exception e) {
      System.out.println("写入文件: "+e.getMessage());
    } finally {
      if (bos != null) try { bos.close(); } catch (IOException e) { }
      if (fos != null) try { fos.close(); } catch (IOException e) { }
    }
    return true;
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
