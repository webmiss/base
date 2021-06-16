package webmis.library.aliyun;

import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import webmis.config.Aliyun;
import webmis.service.Base;
import webmis.util.Base64;
import webmis.util.Hash;
import webmis.util.Util;

/* 签名 */
public class Signature extends Base {

  /* 签名直传 */
  public static JSONObject PolicySign(long expireTime, long maxSize) {
    // 配置
    HashMap<String, Object> cfg = Aliyun.RAM();
    JSONArray conditions = new JSONArray();
    JSONArray tmp = new JSONArray();
    // 限制大小
    tmp.add("content-length-range");
    tmp.add(0);
    tmp.add(maxSize);
    conditions.add(tmp);
    // 超时时间
    long now = Util.Time();
    long expire = now + expireTime;
    String expiration = Util.GmtISO8601(expire);
    // 签名数据
    JSONObject policyData = new JSONObject();
    policyData.put("expiration", expiration);
    policyData.put("conditions", conditions);
    String policyStr = Util.JsonEncode(policyData);
    String policy = Base64.ToStr(Base64.Encode(Base64.ToByte(policyStr)));
    String signature = Hash.Base64Encode(Hash.HmacSha1(policy, Base64.ToByte(cfg.get("AccessKeySecret").toString())));
    // 返回
    JSONObject res = new JSONObject();
    res.put("accessid", cfg.get("AccessKeyId"));
    res.put("policy", policy);
    res.put("policy", policy);
    res.put("signature", signature);
    res.put("expire", expire);
    return res;
  }
  
}
