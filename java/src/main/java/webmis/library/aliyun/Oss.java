package webmis.library.aliyun;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.DeleteObjectsRequest;
import com.aliyun.oss.model.DeleteObjectsResult;
import com.aliyun.oss.model.ListObjectsRequest;
import com.aliyun.oss.model.OSSObjectSummary;
import com.aliyun.oss.model.ObjectListing;

import webmis.config.Aliyun;
import webmis.util.Type;

/* 对象存储 */
public class Oss extends Signature {

  public static OSS OssConn = null;           //连接
  public static String AccessKeyId = "";      //RAM: AccessKeyId
  public static String AccessKeySecret = "";  //RAM: AccessKeySecret
  public static String Endpoint = "";         //地域节点
  public static String Bucket = "";           //Bucket名称

  /* 签名直传 */
  static public JSONObject Policy(String dir, String file, long expireTime, long maxSize) {
    HashMap<String, Object> cfg = Aliyun.OSS();
    // 默认值
    if(expireTime==0) expireTime = Type.Long(cfg.get("ExpireTime"));
    if(maxSize==0) maxSize = Type.Long(cfg.get("MaxSize"));
    // 数据
    JSONObject res = PolicySign(expireTime, maxSize);
    res.put("host", "https://"+cfg.get("Bucket").toString()+"."+cfg.get("Endpoint").toString());
    res.put("dir", dir);
    res.put("file", file);
    res.put("max_size", maxSize);
    // 回调
    res.put("callback", "");
    return res;
  }

  /* 初始化 */
  public static OSS Init() {
    // 配置
    HashMap<String, Object> ramCfg = Aliyun.RAM();
    HashMap<String, Object> ossCfg = Aliyun.OSS();
    if(AccessKeyId=="") AccessKeyId = ramCfg.get("AccessKeyId").toString();
    if(AccessKeySecret=="") AccessKeySecret = ramCfg.get("AccessKeySecret").toString();
    if(Endpoint=="") Endpoint = ossCfg.get("Endpoint").toString();
    if(Bucket=="") Bucket = ossCfg.get("Bucket").toString();
    // 连接
    if(OssConn==null){
      OssConn = new OSSClientBuilder().build(Endpoint, AccessKeyId, AccessKeySecret);
    }
    return OssConn;
  }

  /* 列表 */
  static public HashMap<String, ArrayList<String>> ListObject(String path) {
    HashMap<String, ArrayList<String>> res = new HashMap<>();
    ArrayList<String> folder = new ArrayList<>();
    ArrayList<String> file = new ArrayList<>();
    res.put("folder", folder);
    res.put("file", file);
    // 连接
    OSS conn = Init();
    if(conn==null) return res;
    ObjectListing objectListing = conn.listObjects(new ListObjectsRequest(Bucket).withPrefix(path).withDelimiter("/"));
    // 文件夹
    for (String val : objectListing.getCommonPrefixes()) {
      folder.add(val);
    }
    // 文件
    List<OSSObjectSummary> sums = objectListing.getObjectSummaries();
    for (OSSObjectSummary s : sums) {
      file.add(s.getKey());
    }
    // 关闭
    conn.shutdown();
    return res;
  }

  /* 上传 */
  static public boolean PutObject(String file, byte[] content) {
    if(file.isEmpty()) return false;
    // 连接
    OSS conn = Init();
    if(conn==null) return false;
    // 执行
    conn.putObject(Bucket, file, new ByteArrayInputStream(content));
    return true;
  }

  /* 删除-单个 */
  static public boolean DeleteObject(String file) {
    if(file.isEmpty()) return false;
    // 连接
    OSS conn = Init();
    if(conn==null) return false;
    // 执行
    try{
      conn.deleteObject(Bucket, file);
      // 关闭
      conn.shutdown();
      return true;
    } catch (Exception e) {
      Print("[OSS] Dels: ", e.getMessage());
      return false;
    }
  }

  /* 删除-多个 */
  static public boolean DeleteObjects(ArrayList<String> files) {
    if(files==null) return false;
    // 连接
    OSS conn = Init();
    if(conn==null) return false;
    // 执行
    try{
      DeleteObjectsResult deleteObjectsResult = conn.deleteObjects(new DeleteObjectsRequest(Bucket).withKeys(files));
      deleteObjectsResult.getDeletedObjects();
      // 关闭
      conn.shutdown();
      return true;
    } catch (Exception e) {
      Print("[OSS] Dels: ", e.getMessage());
      return false;
    }
  }

  /* 删除-文件夹&文件 */
  static public boolean DeleteObjectAll(String path) {
    if(path.isEmpty()) return false;
    // 连接
    OSS conn = Init();
    if(conn==null) return false;
    try{
      // 文件
      String last = path.substring(path.length()-1, path.length());
      if(last != "/") conn.deleteObject(Bucket, path);
      // 文件夹
      String nextMarker = null;
      ObjectListing objectListing = null;
      ArrayList<String> objects = new ArrayList<String>();
      do {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest(Bucket).withPrefix(path).withMarker(nextMarker);
        objectListing = conn.listObjects(listObjectsRequest);
        for (OSSObjectSummary val : objectListing.getObjectSummaries()) {
          objects.add(val.getKey());
        }
      } while (objectListing.isTruncated());
      return DeleteObjects(objects);
    } catch (Exception e) {
      Print("[OSS] DelAll: ", e.getMessage());
      return false;
    }
  }
  
}
