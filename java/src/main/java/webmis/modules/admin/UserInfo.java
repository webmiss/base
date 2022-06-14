package webmis.modules.admin;

import java.util.HashMap;

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
@Controller("AdminUserInfo")
@RequestMapping("/admin/user_info")
public class UserInfo extends Base {

  private static final String ImgDir = "upload/user/img/";

  /* 列表 */
  @RequestMapping("list")
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    // 查询
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    model.Columns("nickname", "name", "gender", "FROM_UNIXTIME(birthday, '%Y-%m-%d') as birthday", "department", "position", "img");
    model.Where("uid=?", tData.get("uid").toString());
    HashMap<String, Object> list = model.FindFirst();
    // 数据
    list.put("img", Data.Img(list.get("img")));
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
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    // 参数
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    HashMap<String,Object> info = new HashMap<String,Object>();
    info.put("nickname", Util.Trim(param.get("nickname").toString()));
    info.put("name", Util.Trim(param.get("name").toString()));
    info.put("gender", Util.Trim(param.get("gender").toString()));
    String birthday = Util.Trim(param.get("birthday").toString());
    info.put("birthday", Util.StrToTime(birthday, "yyyy-MM-dd"));
    info.put("department", Util.Trim(param.get("department").toString()));
    info.put("position", Util.Trim(param.get("position").toString()));
    model.Set(info);
    model.Where("uid=?", tData.get("uid").toString());
    model.Update();
    // 返回
    info.put("uname", tData.get("uname").toString());
    info.put("img", param.get("img").toString());
    info.put("birthday", birthday);
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("uinfo", info);
    return GetJSON(res);
  }

  /* 头像 */
  @RequestMapping("upimg")
  String Upimg(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String base64 = JsonName(json, "base64");
    // 验证
    String msg = AdminToken.Verify(token, "");
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
    // 数据
    HashMap<String, Object> tData = AdminToken.Token(token);
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    model.Columns("img");
    model.Where("uid=?", tData.get("uid").toString());
    HashMap<String, Object> imgData = model.FindFirst();
    HashMap<String, Object> upParam = new HashMap<String, Object>();
    upParam.put("img", ImgDir+img);
    model.Set(upParam);
    model.Where("uid=?", tData.get("uid").toString());
    if(!model.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 清理
    FileEo.Root = Env.root_dir;
    FileEo.RemoveAll(imgData.get("img").toString());
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("img", Data.Img(ImgDir+img));
    return GetJSON(res);
  }

}
