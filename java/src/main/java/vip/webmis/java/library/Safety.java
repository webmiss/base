package vip.webmis.java.library;

import java.util.HashMap;

import vip.webmis.java.Env;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;

/**
 * 安全验证类
 */
public class Safety {

  /* 加密 */
  public static String encode(HashMap<String,Object> data){
    String token = "";
    try {
      Algorithm algorithm = Algorithm.HMAC256(Env.key);
      token = JWT.create().withIssuer(JSON.toJSONString(data)).sign(algorithm);
      return token;
    } catch (JWTCreationException exception){
      return token;
    }
  }

  /* 解密 */
  public static HashMap<String,Object> decode(String token){
    HashMap<String,Object> res = new HashMap<>();
    try {
      DecodedJWT jwt = JWT.decode(token);
      String data = jwt.getIssuer();
      return JSON.parseObject(data,new TypeReference<HashMap<String,Object>>(){});
    } catch (JWTDecodeException exception){
      return res;
    }
  }
  
}
