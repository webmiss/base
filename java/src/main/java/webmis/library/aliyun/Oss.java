package webmis.library.aliyun;

import java.io.ByteArrayInputStream;
import java.util.HashMap;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;

import webmis.config.Aliyun;
import webmis.service.Base;

/* 对象存储 */
public class Oss extends Base {

  public static OSS OssConn = null;           //连接
  public static String AccessKeyId = "";      //RAM: AccessKeyId
  public static String AccessKeySecret = "";  //RAM: AccessKeySecret
  public static String Endpoint = "";         //地域节点
  public static String Bucket = "";           //Bucket名称

  /* 初始化 */
  public static OSS Init() {
    // 配置
    HashMap<String, Object> cfg = Aliyun.RAM();
    if(AccessKeyId=="") AccessKeyId=cfg.get("AccessKeyId").toString();
    if(AccessKeySecret=="") AccessKeySecret=cfg.get("AccessKeySecret").toString();
    if(Endpoint=="") Endpoint=cfg.get("Endpoint").toString();
    if(Bucket=="") Bucket=cfg.get("Bucket").toString();
    // 连接
    if(OssConn==null){
      OssConn = new OSSClientBuilder().build(Endpoint, AccessKeyId, AccessKeySecret);
    }
    return OssConn;
  }

  /* 上传 */
  static public boolean PutObject(String object, byte[] content) {
    OSS conn = Init();
    PutObjectResult res = conn.putObject(Bucket, object, new ByteArrayInputStream(content));
    Print(res);
    return true;
  }
  
}
