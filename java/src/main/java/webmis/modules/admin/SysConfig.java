package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.Data;
import webmis.config.Env;
import webmis.library.FileEo;
import webmis.library.Upload;
import webmis.service.AdminToken;
import webmis.util.Util;

@RestController
@Controller("AdminSysConfig")
@RequestMapping("/admin/sysconfig")
public class SysConfig extends Base {

  private static final String ImgDir = "upload/admin/img/";

  /* 列表 */
  @RequestMapping("list")
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 查询
    webmis.model.SysConfig model = new webmis.model.SysConfig();
    model.Columns("name", "val");
    ArrayList<HashMap<String, Object>> data = model.Find();
    // 数据
    HashMap<String, Object> list = new HashMap<String, Object>();
    for(HashMap<String, Object> val : data){
      if(val.get("name").equals("logo") || val.get("name").equals("login_bg")){
        list.put(val.get("name").toString(), Data.Img(val.get("val")));
      } else {
        list.put(val.get("name").toString(), val.get("val"));
      }
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    return GetJSON(res);
  }

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String data = JsonName(json, "data");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.SysConfig m = new webmis.model.SysConfig();
    JSONObject param = Util.JsonDecode(data);
    String key;
    Object val;
    HashMap<String,Object> uData;
    for(Entry<String, Object> entry : param.entrySet()){
      key = entry.getKey();
      val = entry.getValue();
      if(key.equals("logo") || key.equals("login_bg")) continue;
      uData = new HashMap<String,Object>();
      uData.put("val", Util.Trim(val.toString()));
      m.Set(uData);
      m.Where("name=?", key);
      if(!m.Update()){
        res = new HashMap<String,Object>();
        res.put("code", 4000);
        res.put("msg", "参数错误!");
        return GetJSON(res);
      }
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

  /* 头像 */
  @RequestMapping("upimg")
  String Upimg(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String name = JsonName(json, "name");
    String base64 = JsonName(json, "base64");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(base64==null || base64.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    if(name.equals("logo") && name.equals("login_bg")) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "类型错误!");
      return GetJSON(res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",ImgDir);
    param.put("base64",base64);
    String img = Upload.Base64(param);
    if(img.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.SysConfig m = new webmis.model.SysConfig();
    m.Columns("val");
    m.Where("name=?", name);
    HashMap<String, Object> imgData = m.FindFirst();
    HashMap<String, Object> upParam = new HashMap<String, Object>();
    upParam.put("val", ImgDir+img);
    m.Set(upParam);
    m.Where("name=?", name);
    if(!m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 清理
    FileEo.Root = Env.root_dir;
    String rmImg = imgData.get("val").toString();
    FileEo.RemoveAll(rmImg);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("img", Data.Img(ImgDir+img));
    return GetJSON(res);
  }

}
