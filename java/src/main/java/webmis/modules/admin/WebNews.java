package webmis.modules.admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.config.Env;
import webmis.library.FileEo;
import webmis.library.Upload;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.service.Data;
import webmis.util.Type;
import webmis.util.Util;

@RestController
@Controller("AdminWebNews")
@RequestMapping("/admin/news")
public class WebNews extends Base {

  private static String where;
  private static Object[] whereData;
  private static final String ImgDir = "upload/news/";

  /* 列表 */
  @RequestMapping("list")
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String data = JsonName(json, "data");
    int page = Integer.valueOf(JsonName(json, "page"));
    int limit = Integer.valueOf(JsonName(json, "limit"));
    String order = JsonName(json, "order");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(data=="" || page==0 || limit==0){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 条件
    JSONObject param = Util.JsonDecode(data);
    whereData = getWhere(param);
    // 统计
    webmis.model.WebNews m = new webmis.model.WebNews();
    m.Columns("count(*) AS num");
    m.Where(where, whereData);
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "cid", "title", "source", "author", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "state", "img", "summary");
    m.Where(where, whereData);
    m.Order(!order.equals("")?order:"id DESC");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
    // 数据
    for (HashMap<String, Object> val : list) {
      val.put("img", Data.Img(val.get("img")));
      val.put("state", val.get("state").equals("1")?true:false);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    res.put("total", Type.Int(total.get("num")));
    return GetJSON(res);
  }
  /* 搜索条件 */
  private Object[] getWhere(JSONObject param) {
    // 参数
    String cid = param.containsKey("cid")?String.valueOf(param.get("cid")).trim():"";
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    String source = param.containsKey("source")?String.valueOf(param.get("source")).trim():"";
    String author = param.containsKey("author")?String.valueOf(param.get("author")).trim():"";
    // 条件
    where = "cid like ? AND title like ? AND source like ? AND author like ?";
    Object[] whereData = {"%"+cid+"%", "%"+title+"%", "%"+source+"%", "%"+author+"%"};
    return whereData;
  }

  /* 添加 */
  @RequestMapping("add")
  String Add(@RequestBody JSONObject json, HttpServletRequest request) throws SQLException {
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
    // 数据
    JSONObject param = Util.JsonDecode(data);
    String base64 = param.containsKey("img")?String.valueOf(param.get("img")).trim():"";
    String cid = param.containsKey("cid")?String.valueOf(param.get("cid")).trim():"";
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    String source = param.containsKey("source")?String.valueOf(param.get("source")).trim():"";
    String author = param.containsKey("author")?String.valueOf(param.get("author")).trim():"";
    String summary = param.containsKey("summary")?String.valueOf(param.get("summary")).trim():"";
    if(base64.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "请上传封面图!");
      return GetJSON(res);
    }
    if(cid.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "请选择分类!");
      return GetJSON(res);
    }
    if(Util.Len(title)<2 || Util.Len(title)>30){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "新闻标题2～30字符!");
      return GetJSON(res);
    }
    // 封面图
    String path = ImgDir+"img/";
    HashMap<String, Object> imgParam = new HashMap<String, Object>();
    imgParam.put("path",path);
    imgParam.put("base64",base64);
    String img = Upload.Base64(imgParam);
    // 模型
    Object[] sql;
    PreparedStatement ps;
    HashMap<String,Object> uData;
    webmis.model.WebNews model = new webmis.model.WebNews();
    Connection conn = model.DBConn();
    try {
      conn.setAutoCommit(false);
      // 信息
      webmis.model.WebNews m1 = new webmis.model.WebNews();
      uData = new HashMap<String,Object>();
      uData.put("cid", cid);
      uData.put("title", title);
      uData.put("source", source);
      uData.put("author", author);
      uData.put("summary", summary);
      uData.put("ctime", Util.Time());
      uData.put("utime", Util.Time());
      uData.put("img", path+img);
      m1.Values(uData);
      sql = m1.InsertSQL();
      ps = m1.Bind(conn, sql[0], sql[1], true);
      ps.executeUpdate();
      int id = model.LastInsertId(ps);
      ps.close();
      // 内容
      webmis.model.WebNewsHtml m2 = new webmis.model.WebNewsHtml();
      uData = new HashMap<String,Object>();
      uData.put("nid", id);
      m2.Values(uData);
      sql = m2.InsertSQL();
      ps = m2.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 提交
      conn.commit();
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } catch (SQLException e) {
      conn.rollback();
      FileEo.Root = Env.root_dir;
      FileEo.RemoveAll(path+img);
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "添加失败!");
    } finally {
      conn.close();
    }
    return GetJSON(res);
  }

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String data = JsonName(json, "data");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(id=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    String base64 = param.containsKey("img")?String.valueOf(param.get("img")).trim():"";
    String cid = param.containsKey("cid")?String.valueOf(param.get("cid")).trim():"";
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    String source = param.containsKey("source")?String.valueOf(param.get("source")).trim():"";
    String author = param.containsKey("author")?String.valueOf(param.get("author")).trim():"";
    String summary = param.containsKey("summary")?String.valueOf(param.get("summary")).trim():"";
    if(base64.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "请上传封面图!");
      return GetJSON(res);
    }
    if(cid.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "请选择分类!");
      return GetJSON(res);
    }
    if(Util.Len(title)<2 || Util.Len(title)>30){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "新闻标题2～30字符!");
      return GetJSON(res);
    }
    // 封面图
    String img = "";
    String path = ImgDir+"img/";
    FileEo.Root = Env.root_dir;
    if(!base64.substring(0,4).equals("http")){
      HashMap<String, Object> imgParam = new HashMap<String, Object>();
      imgParam.put("path",path);
      imgParam.put("base64",base64);
      img = Upload.Base64(imgParam);
      // 清理封面
      webmis.model.WebNews m1 = new webmis.model.WebNews();
      m1.Columns("img");
      m1.Where("id=?", id);
      HashMap<String, Object> tmp = m1.FindFirst();
      FileEo.RemoveAll(tmp.get("img").toString());
    }
    // 模型
    webmis.model.WebNews m = new webmis.model.WebNews();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("cid", cid);
    uData.put("title", title);
    uData.put("source", source);
    uData.put("author", author);
    uData.put("summary", summary);
    uData.put("utime", Util.Time());
    if(!img.equals("")) uData.put("img", path+img);
    m.Set(uData);
    m.Where("id=?", id);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      if(!img.equals("")) FileEo.RemoveAll(path+img);
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }

  /* 删除 */
  @RequestMapping("del")
  String Del(@RequestBody JSONObject json, HttpServletRequest request) throws SQLException {
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
    // 数据
    JSONArray param = Util.JsonDecodeArray(data);
    String ids = Util.Implode(",", JSONArray.parseArray(param.toJSONString()));
    // 封面图
    webmis.model.WebNews m = new webmis.model.WebNews();
    m.Columns("id", "img");
    m.Where("id in("+ids+")");
    ArrayList<HashMap<String, Object>> imgList = m.Find();
    // 模型
    Object[] sql;
    PreparedStatement ps;
    webmis.model.WebNews model = new webmis.model.WebNews();
    Connection conn = model.DBConn();
    try {
      conn.setAutoCommit(false);
      // 信息
      webmis.model.WebNews m1 = new webmis.model.WebNews();
      m1.Where("id in("+ids+")");
      sql = m1.DeleteSQL();
      ps = m1.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 内容
      webmis.model.WebNewsHtml m2 = new webmis.model.WebNewsHtml();
      m2.Where("nid in("+ids+")");
      sql = m2.DeleteSQL();
      ps = m2.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 提交
      conn.commit();
      // 清理图片
      FileEo.Root = Env.root_dir;
      for(HashMap<String, Object> v: imgList){
        FileEo.RemoveAll(v.get("img").toString());
        FileEo.RemoveAll(ImgDir+v.get("id").toString()+"/");
      }
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } catch (SQLException e) {
      conn.rollback();
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "删除失败!");
    } finally {
      conn.close();
    }
    return GetJSON(res);
  }

  /* 状态 */
  @RequestMapping("state")
  String State(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String state = JsonName(json, "state");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(id==null){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.WebNews m = new webmis.model.WebNews();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("state", Boolean.valueOf(state)?"1":"0");
    uData.put("utime", Util.Time());
    m.Set(uData);
    m.Where("id=?", id);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }

  /* 分类-获取 */
  @RequestMapping("get_class")
  String GetClass(@RequestBody JSONObject json, HttpServletRequest request) {
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
    // 查询
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
    m.Columns("id", "name");
    m.Where("state=?", "1");
    m.Order("sort DESC");
    ArrayList<HashMap<String,Object>> list = m.Find();
    ArrayList<HashMap<String,Object>> data = new ArrayList<HashMap<String,Object>>();
    HashMap<String,Object> tmp;
    for (HashMap<String, Object> v : list) {
      tmp = new HashMap<String,Object>();
      tmp.put("label", v.get("name"));
      tmp.put("value", v.get("id"));
      data.add(tmp);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("data", data);
    return GetJSON(res);
  }

  /* 内容-获取 */
  @RequestMapping("get_content")
  String GetContent(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String nid = JsonName(json, "id");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 查询
    webmis.model.WebNewsHtml m = new webmis.model.WebNewsHtml();
    m.Columns("content");
    m.Where("nid=?", nid);
    HashMap<String,Object> data = m.FindFirst();
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("content", data.get("content"));
    return GetJSON(res);
  }

  /* 内容-修改 */
  @RequestMapping("content")
  String Content(@RequestBody JSONObject json, HttpServletRequest request) {
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
    if(data==null || data.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    String id = param.containsKey("id")?String.valueOf(param.get("id")).trim():"";
    String content = param.containsKey("content")?String.valueOf(param.get("content")).trim():"";
    // 图片回收
    Upload.HtmlImgClear(content, ImgDir+id+"/");
    // 模型
    webmis.model.WebNewsHtml m = new webmis.model.WebNewsHtml();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("content", content);
    m.Set(uData);
    m.Where("nid=?", id);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }

  /* 内容-图片 */
  @RequestMapping("up_img")
  String UpImg(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String base64 = JsonName(json, "base64");
    String id = JsonName(json, "id");
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
    String path = ImgDir+id+"/";
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",path);
    param.put("base64",base64);
    String img = Upload.Base64(param);
    if(img.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
      res.put("img", Data.Img(path+img));
    }
    // 返回
    return GetJSON(res);
  }
  
}
