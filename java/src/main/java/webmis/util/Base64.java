package webmis.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class Base64 {

  /* String To Bytes */
  public static byte[] ToByte(String data) {
    return data.getBytes();
  }

  /* Bytes To String */
  public static String ToStr(byte[] data) {
    return new String(data);
  }

  /* 编码 */
  public static byte[] Encode(byte[] data) {
    return java.util.Base64.getEncoder().encode(data);
  }

  /* 解码 */
  public static byte[] Decode(byte[] data) {
    return java.util.Base64.getDecoder().decode(data);
  }

  /* 编码(URL) */
  public static String UrlEncode(byte[] data) {
    // 编码
    String res = (java.util.Base64.getEncoder().encodeToString(data)).replaceAll("\\s*", "");
    // 替换
    HashMap<String, String> replace = new HashMap<String, String>();
    replace.put("\\+", "*");
    replace.put("/", "-");
    replace.put("=", "_");
    String k,v;
    for(Entry<String, String> entry : replace.entrySet()){
      k = entry.getKey();
      v = entry.getValue();
      res = res.replaceAll(k, v);
    }
    return res;
  }

  /* 解码(URL) */
  public static byte[] UrlDecode(String data) {
    // 替换
    HashMap<String, String> replace = new HashMap<String, String>();
    replace.put("\\*", "+");
    replace.put("-", "/");
    replace.put("_", "=");
    String k,v;
    for(Entry<String, String> entry : replace.entrySet()){
      k = entry.getKey();
      v = entry.getValue();
      data = data.replaceAll(k, v);
    }
    // 解码
    return java.util.Base64.getDecoder().decode(data);
  }

  /* 压缩 */
  public static byte[] Compress(byte[] data) {
    Deflater compressor = new Deflater();
    compressor.setInput(data);
    compressor.finish();
    byte[] compressedBytes = new byte[2048];
    int compressedBytesLength = compressor.deflate(compressedBytes);
    compressor.end();
    return Arrays.copyOfRange(compressedBytes, 0, compressedBytesLength);
  }

  /* 解压 */
  public static String UnCompress(byte[] data) {
    try {
      Inflater compressor = new Inflater();
      compressor.setInput(data);
      compressor.finished();
      byte[] compressedBytes = new byte[2048];
      int compressedBytesLength;
      compressedBytesLength = compressor.inflate(compressedBytes);
      compressor.end();
      byte[] out = Arrays.copyOfRange(compressedBytes, 0, compressedBytesLength);
      return new String(out);
    } catch (DataFormatException e) {
      return null;
    }
  }

  /* 获取后缀 */
  static public String GetExt(String base64Type) {
    String ext = "";
    if(base64Type.equals("data:image/jpeg;base64")) ext="jpg";
    else if (base64Type.equals("data:image/png;base64")) ext="png";
    else if (base64Type.equals("data:image/gif;base64")) ext="gif";
    return ext;
  }
  
}
