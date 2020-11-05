package vip.webmis.java.library;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/* 下载类 */
public class Down {

  /* Blob方式 */
  public static byte[] fileBlob(String path, String filename){
    byte[] bytes = null;
    FileInputStream fs = null;
    try{
      File file = new File(path+filename);
      fs = new FileInputStream(file);
      bytes = new byte[(int)file.length()];
      fs.read(bytes);
      fs.close();
    }catch(IOException e){
      System.out.println("读取文件失败:"+e.getMessage());
    }finally{
      try { fs.close(); }catch(IOException e) { }
    }
    return bytes;
  }
  
}
