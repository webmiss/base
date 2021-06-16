package webmis.util;

import java.security.MessageDigest;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.util.DigestUtils;

/* 哈希 */
public class Hash {

  /* Md5 */
  public static String Md5(String data) {
    return DigestUtils.md5DigestAsHex(data.getBytes());
  }

  /* Sha256 */
  public static String Sha256(String data) {
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      md.update(data.getBytes("UTF-8"));
      return HexEncode(md.digest());
    } catch (Exception e) {
      return "";
    }
  }

  /* HmacSha1 */
  public static byte[] HmacSha1(String data, byte[] key) {
    try {
      Mac hmac = Mac.getInstance("HmacSHA1");
      SecretKeySpec keySpec = new SecretKeySpec(key, "HmacSHA1");
      hmac.init(keySpec);
      return hmac.doFinal(data.getBytes("UTF-8"));
    } catch (Exception e) {
      return null;
    }
  }

  /* HmacSha256 */
  public static byte[] HmacSha256(String data, byte[] key) {
    try {
      Mac hmac = Mac.getInstance("HmacSHA256");
      SecretKeySpec keySpec = new SecretKeySpec(key, "HmacSHA256");
      hmac.init(keySpec);
      return hmac.doFinal(data.getBytes("UTF-8"));
    } catch (Exception e) {
      return null;
    }
  }

  /* Byte转为String */
  public static String Base64Encode(byte[] data) {
    return java.util.Base64.getEncoder().encodeToString(data);
  }

  /* Byte转为16进制 */
  public static String HexEncode(byte[] bytes) {
    StringBuilder sb = new StringBuilder();
    String temp = null;
    for (byte aByte : bytes) {
      temp = Integer.toHexString(aByte & 0xFF);
      if (temp.length() == 1) {
        sb.append("0");
      }
      sb.append(temp);
    }
    return sb.toString();
  }

  /* String转Byte */
  public static byte[] StrToByte(String str) {
    try {
      byte[] res = str.getBytes("UTF-8");
      return res;
    } catch (Exception e) {
      return null;
    }
  }
  
}
