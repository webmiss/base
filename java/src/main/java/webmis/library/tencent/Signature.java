package webmis.library.tencent;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.TimeZone;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Tencent;
import webmis.service.Base;
import webmis.util.Base64;
import webmis.util.Hash;
import webmis.util.Util;

/* 签名 */
public class Signature extends Base {

  public static String ApiUrl = "https://cvm.tencentcloudapi.com/";     //接口
  public static String Host = "cvm.tencentcloudapi.com";                //主机
  public static String Service = "cvm";                                 //服务
  public static String RequestMethod = "POST";                          //请求方式
  public static String ContentType = "application/json; charset=utf-8"; //数据类型
  public static String CanonicalURI = "/";                              //URI参数
  public static String CanonicalQueryString = "";                       //查询字符串: Limit=10&Offset=0
  public static String SignedHeaders = "content-type;host";             //参与签名
  public static String Algorithm = "TC3-HMAC-SHA256";                   //签名算法
  public static String Action = "DescribeInstances";                    //动作
  public static String Version = "2017-03-12";                          //版本
  public static String Region = "ap-guangzhou";                         //区域

  /* V3-Header */
  public static HashMap<String, Object> V3Header(JSONObject data) {
    // 数据
    String json = data.toString();
    String HashedRequestPayload = Hash.Sha256(json);
    // 请求串
    String CanonicalRequest = RequestMethod+"\n"
    + CanonicalURI+"\n"
    + CanonicalQueryString+"\n"
    + "content-type:"+ContentType+"\n"+"host:"+Host+"\n"+"\n"
    + SignedHeaders+"\n"
    + HashedRequestPayload;
    // 字符串
    String timeStamp = String.valueOf(Util.Time());
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    String date = sdf.format(new Date(Long.valueOf(timeStamp + "000")));
    String CredentialScope = date+"/"+Service+"/tc3_request";
    String HashedCanonicalRequest = Hash.Sha256(CanonicalRequest);
    String StringToSign = Algorithm+"\n"
    + timeStamp+"\n"
    + CredentialScope+"\n"
    + HashedCanonicalRequest;
    // 计算签名
    HashMap<String, Object> cfg = Tencent.CAPI();
    byte[] SecretDate = Hash.HmacSha256(date, ("TC3"+cfg.get("SecretKey").toString()).getBytes());
    byte[] SecretService = Hash.HmacSha256(Service, SecretDate);
    byte[] SecretSigning = Hash.HmacSha256("tc3_request", SecretService);
    String Sign = Hash.HexEncode(Hash.HmacSha256(StringToSign, SecretSigning));
    // Authorization
    String Authorization = Algorithm+" "
    + "Credential="+cfg.get("SecretId")+"/"+CredentialScope+", "
    + "SignedHeaders="+SignedHeaders+", "
    + "Signature="+Sign;
    // 请求头
    HashMap<String, Object> header = new HashMap<String, Object>();
    header.put("Authorization", Authorization);
    header.put("Content-Type", ContentType);
    header.put("Host", Host);
    header.put("X-TC-Action", Action);
    header.put("X-TC-Version", Version);
    header.put("X-TC-Timestamp", timeStamp);
    header.put("X-TC-Region", Region);
    return header;
  }

  /* UserSig */
  public static String UserSig(Object userId) {
    return UserSig(userId, 0);
  }
  public static String UserSig(Object userId, int expire) {
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    if(expire==0) expire=Integer.valueOf(cfg.get("ExpireTime").toString());
    // 参数
    HashMap<String, String> param = new HashMap<String, String>();
    param.put("TLS.ver", "2.0");
    param.put("TLS.identifier", String.valueOf(userId));
    param.put("TLS.sdkappid", String.valueOf(cfg.get("SDKAppID")));
    param.put("TLS.expire", String.valueOf(expire));
    param.put("TLS.time", String.valueOf(Util.Time()));
    // 签名
    param.put("TLS.sig", hmacsha256(param, cfg.get("SecretKey").toString()));
    // 压缩
    byte[] data = Base64.Compress(Util.JsonEncode(param).getBytes());
    return Base64.UrlEncode(data);
  }

  /* 获取Sig */
  private static String hmacsha256(HashMap<String, String> param, String key) {
    String content = "TLS.identifier:"+param.get("TLS.identifier")+"\n"
    +"TLS.sdkappid:"+param.get("TLS.sdkappid")+"\n"
    +"TLS.time:"+param.get("TLS.time")+"\n"
    +"TLS.expire:"+param.get("TLS.expire")+"\n";
    byte[] sig = Hash.HmacSha256(content, key.getBytes());
    return Hash.Base64Encode(sig);
  }

  /* UserSig-验证 */
  @SuppressWarnings("unchecked")
  public static long VerifyUserSig(Object userId, String userSig) {
    // 解码
    byte[] base64 = Base64.UrlDecode(userSig);
    // 解压
    String un_sig = Base64.UnCompress(base64);
    JSONObject json = Util.JsonDecode(un_sig);
    HashMap<String, String> data = JSONObject.parseObject(json.toString(), HashMap.class);
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    if(!String.valueOf(cfg.get("SDKAppID")).equals(data.get("TLS.sdkappid").toString())) return 0;
    if(!String.valueOf(userId).equals(data.get("TLS.identifier").toString())) return 0;
    // 是否过期
    long now_time = Util.Time();
    long out_time = Long.valueOf(data.get("TLS.time").toString()) + Long.valueOf(data.get("TLS.expire").toString());
    if(now_time > out_time) return 0;
    // 验证Sig
    String sig = hmacsha256(data, cfg.get("SecretKey").toString());
    if(!sig.equals(data.get("TLS.sig").toString())) return 0;
    return out_time - now_time;
  }

  
  
}
