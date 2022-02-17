package webmis.modules.admin;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import webmis.service.Base;
import webmis.util.Util;
import webmis.service.AdminToken;
import webmis.config.Env;
import webmis.library.FileEo;
import webmis.library.Upload;

@RestController
@Controller("AdminSysFile")
@RequestMapping("/admin/sys_file")
public class SysFile extends Base {

  private static final String dirRoot="upload/";

  /* 列表 */
  @RequestMapping("list")
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String path = JsonName(json, "path");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(path.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    FileEo.Root = Env.root_dir+dirRoot;
    HashMap<String, Object> list = FileEo.List(path);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("url", Env.base_url+dirRoot);
    res.put("data", list);
    return GetJSON(res);
  }

  /* 新建文件夹 */
  @RequestMapping("mkdir")
  String Mkdir(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String path = JsonName(json, "path");
    String name = JsonName(json, "name");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(path.isEmpty() || name.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    FileEo.Root = Env.root_dir+dirRoot;
    if(!FileEo.Mkdir(path+name)) {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "新建文件夹失败!");
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

  /* 重命名 */
  @RequestMapping("rename")
  String Rename(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String path = JsonName(json, "path");
    String rename = JsonName(json, "rename");
    String name = JsonName(json, "name");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(path.isEmpty() || rename.isEmpty() || name.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    FileEo.Root = Env.root_dir+dirRoot;
    if(!FileEo.Rename(path+rename, path+name)) {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "重命名失败!");
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

  /* 上传 */
  @RequestMapping("upload")
  String Upload(HttpServletRequest request, String token, String path, @RequestParam("up") MultipartFile file) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(path.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("path",dirRoot+path);
    params.put("bind",null);
    String img = Upload.File(file, params);
    if(img.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

  /* 下载 */
  @RequestMapping("down")
  byte[] Down(@RequestBody JSONObject json, HttpServletRequest request) {
    // 参数
    String token = JsonName(json, "token");
    String path = JsonName(json, "path");
    String filename = JsonName(json, "filename");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")) return null;
    // 参数
    if(path.isEmpty() || filename.isEmpty()) return null;
    // 返回
    return FileEo.Bytes(path+filename);
  }

  /* 删除 */
  @RequestMapping("remove")
  String Remove(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String path = JsonName(json, "path");
    String data = JsonName(json, "data");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(path.isEmpty() || data.isEmpty()) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    FileEo.Root = Env.root_dir+dirRoot;
    JSONArray files = Util.JsonDecodeArray(data);
    for(Object val:files) FileEo.RemoveAll(path+val.toString());
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

}
