package vip.webmis.java.modules.admin;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.library.Upload;
import vip.webmis.java.model.SysConfig;

@RestController
@Controller("SysConfigController")
@RequestMapping("/admin/Sysconfig")
public class SysconfigController extends Base {

  private static String imgDir = "upload/admin/img/";

  /* 列表 */
  @RequestMapping("/list")
  String list(String token) throws Exception {
    HashMap<String, Object> _res;
    // 验证
    AdminToken.urlVerify(token,"SysConfig");
    // 查询
    SysConfig model = new SysConfig();
    model.columns("name,val");
    ArrayList<HashMap<String, Object>> config = model.find();
    HashMap<String, Object> list = new HashMap<String, Object>();
    for(HashMap<String, Object> val : config){
      list.put(val.get("name").toString(),val.get("val"));
      // 图片
      if(val.get("name").equals("logo") || val.get("name").equals("login_bg")){
        list.put(val.get("name").toString(),!val.get("val").equals("")?Env.base_url+val.get("val").toString():"");
      }
    }
    // 返回
    _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list", list);
    return getJSON(_res);
  }

  /* 编辑 */
  @RequestMapping("/edit")
  String edit(String token, String data) throws Exception {
    HashMap<String, Object> _res;
    // 验证
    AdminToken.urlVerify(token,"SysConfig");
    // 参数
    if(data==null || data.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    JSONObject jsonData = JSON.parseObject(data);
    // 查询
    SysConfig model = new SysConfig();
    model.where("name in (\"title\",\"http\",\"copy\")");
    model.columns("name");
    ArrayList<HashMap<String, Object>> config = model.find();
    // 保存
    for(HashMap<String, Object> val : config){
      model = new SysConfig();
      if(val.get("name").equals("title")) model.val = jsonData.get("title").toString().trim();
      else if(val.get("name").equals("http")) model.val = jsonData.get("http").toString().trim();
      else if(val.get("name").equals("copy")) model.val = jsonData.get("copy").toString().trim();
      model.uField("val");
      model.where("name=\""+val.get("name").toString()+"\"");
      model.update();
    }
    // 返回
    _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    return getJSON(_res);
  }

  /* 头像上传 */
  @RequestMapping("/upImg")
  String index(String token, String type, String base64) throws Exception {
    HashMap<String, Object> _res;
    // 验证
    AdminToken.urlVerify(token,"SysConfig");
    // 是否为空
    if(type.trim().equals("") || base64.trim().equals("")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 类型
    String name;
    if(type.equals("logo")) name="logo";
    else if(type.equals("login_bg")) name="login_bg";
    else{
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "类型错误!");
      return getJSON(_res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",imgDir);
    param.put("base64",base64);
    HashMap<String, Object> res = Upload.base64(param);
    if(!res.isEmpty()){
      SysConfig m1 = new SysConfig();
      m1.where("name=\""+name+"\"");
      m1.columns("val");
      HashMap<String, Object> info = m1.findFirst();
      // 头像
      String img = !info.get("val").equals("")?info.get("val").toString():"";
      // 保存
      SysConfig m2 = new SysConfig();
      m2.val = imgDir+res.get("filename").toString();
      m2.uField("val");
      m2.where("name=\""+name+"\"");
      if(m2.update()){
        // 清理头像
        File file = new File(img);
        if(file.exists()) file.delete();
        // 返回
        _res = new HashMap<String, Object>();
        _res.put("code", 0);
        _res.put("msg", "上传成功");
        _res.put("img", Env.base_url+imgDir+String.valueOf(res.get("filename")));
        return getJSON(_res);
      }else{
        _res = new HashMap<String, Object>();
        _res.put("code", 5000);
        _res.put("msg", "保存数据失败!");
        return getJSON(_res);
      }
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "保存图片失败!");
      return getJSON(_res);
    }
  }

}