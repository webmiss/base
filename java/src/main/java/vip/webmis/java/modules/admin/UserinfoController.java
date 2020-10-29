package vip.webmis.java.modules.admin;

import java.io.File;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.library.Upload;
import vip.webmis.java.model.UserInfo;

@RestController
@Controller("UserInfoController")
@RequestMapping("/admin/Userinfo")
public class UserinfoController extends Base {

  private static String imgDir = "upload/user/img/";

  /* 列表 */
  @RequestMapping("/list")
  String list(String token) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    HashMap<String, Object> params;
    params = new HashMap<String, Object>();
    params.put("where","uid="+String.valueOf(tokenData.get("uid")));
    HashMap<String, Object> info = new UserInfo().findFirst(params);
    // 添加
    if(info.isEmpty()){
      params = new HashMap<String, Object>();
      params.put("uid",String.valueOf(tokenData.get("uid")));
      params.put("ctime",Inc.date("yyyy-MM-dd HH:mm:ss"));
      new UserInfo().insert(params);
      // 查询
      params = new HashMap<String, Object>();
      params.put("where","uid="+String.valueOf(tokenData.get("uid")));
      info = new UserInfo().findFirst(params);
    }
    // 数据
    HashMap<String, Object> list = new HashMap<String, Object>();
    list.put("img",!info.get("img").equals("")?Env.base_url+String.valueOf(info.get("img")):"");
    list.put("nickname",info.get("nickname"));
    list.put("name",info.get("name"));
    list.put("gender",info.get("gender"));
    list.put("birthday",info.get("birthday")!=null?info.get("birthday"):"");
    list.put("position",info.get("position"));
    // 返回
    _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list", list);
    return getJSON(_res);
  }

  /* 头像上传 */
  @RequestMapping("/edit")
  String edit(String token, String data) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    if(data==null || data.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 数据
    HashMap<String, Object> params = new HashMap<String, Object>();
    Set<String> arr = new HashSet<String>();
    arr.add("uid");
    arr.add("img");
    JSONObject jsonData = JSON.parseObject(data);
    Set<String> keys = jsonData.keySet();
    for(String key : keys){
      if(arr.contains(key)) continue;
      params.put(key,String.valueOf(jsonData.get(key)).trim());
    }
    // 用户信息
    HashMap<String, Object> uinfo = new HashMap<String, Object>();
    uinfo.put("img",jsonData.get("img"));
    uinfo.put("nickname",params.get("nickname"));
    uinfo.put("name",params.get("name"));
    uinfo.put("gender",params.get("gender"));
    uinfo.put("birthday",params.get("birthday"));
    uinfo.put("position",params.get("position"));
    // 保存
    HashMap<String, Object> uData = new HashMap<String, Object>();
    uData.put("data",params);
    uData.put("where","uid="+String.valueOf(tokenData.get("uid")));
    boolean res = new UserInfo().update(uData);
    if(res){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      _res.put("uinfo", uinfo);
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "保存失败!");
      return getJSON(_res);
    }
  }

  /* 头像上传 */
  @RequestMapping("/upImg")
  String index(String token, String base64) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    // 是否为空
    if(base64==null || base64.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "Base64内容为空!");
      return getJSON(_res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",imgDir);
    param.put("base64",base64);
    HashMap<String, Object> res = Upload.base64(param);
    if(!res.isEmpty()){
      param = new HashMap<String, Object>();
      param.put("where","uid="+String.valueOf(tokenData.get("uid")));
      HashMap<String, Object> info = new UserInfo().findFirst(param);
      if(info.isEmpty()){
        param = new HashMap<String, Object>();
        param.put("uid",tokenData.get("uid"));
        param.put("img",imgDir+String.valueOf(res.get("filename")));
        param.put("ctime",Inc.date("yyyy-MM-dd HH:mm:ss"));
        new UserInfo().insert(param);
      }else{
        // 头像
        String img = !info.get("img").equals("")?String.valueOf(info.get("img")):"";
        // 保存
        param = new HashMap<String, Object>();
        param.put("uid",tokenData.get("uid"));
        param.put("img",imgDir+String.valueOf(res.get("filename")));
        param.put("utime",Inc.date("yyyy-MM-dd HH:mm:ss"));
        HashMap<String, Object> uData = new HashMap<String, Object>();
        uData.put("data",param);
        uData.put("where","uid="+String.valueOf(tokenData.get("uid")));
        new UserInfo().update(uData);
        // 清理头像
        File file = new File(img);
        if(file.exists()) file.delete();
      }
      // 返回数据
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      _res.put("img", Env.base_url+imgDir+String.valueOf(res.get("filename")));
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "保存图片失败!");
      return getJSON(_res);
    }
  }

}