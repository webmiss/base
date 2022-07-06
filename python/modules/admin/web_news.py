from flask import request

from config.env import Env
from service.base import Base
from service.admin_token import AdminToken
from service.data import Data
from model.web_news import WebNews as WebNewsM
from model.web_news_html import WebNewsHtml
from model.web_news_class import WebNewsClass
from library.file_eo import FileEo
from library.upload import Upload
from util.util import Util

class WebNews(Base):

  ImgDir: str='upload/news/'

  # 列表
  def List(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    page = self.JsonName(json, 'page')
    limit = self.JsonName(json, 'limit')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not data or not page or not limit :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 条件
    param = Util.JsonDecode(data)
    where, whereData = self.__getWhere(param)
    # 统计
    m = WebNewsM()
    m.Columns('count(*) AS num')
    m.Where(where, *whereData)
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'cid', 'title', 'source', 'author', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'state', 'img', 'summary')
    m.Where(where, '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', *whereData)
    m.Page(int(page), int(limit))
    m.Order('id DESC')
    list = m.Find()
    # 数据
    for v in list :
      v['img'] = Data.Img(v['img'])
      v['state'] = True if v['state']=='1' else False
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list, 'total':int(total['num'])})

  # 搜索条件
  def __getWhere(self, param):
    # 参数
    cid = Util.Trim(param['cid']) if 'cid' in param.keys() else ''
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    source = Util.Trim(param['source']) if 'source' in param.keys() else ''
    author = Util.Trim(param['author']) if 'author' in param.keys() else ''
    # 条件
    where = 'cid LIKE %s AND title LIKE %s AND source LIKE %s AND author LIKE %s'
    whereData = ('%'+cid+'%', '%'+title+'%', '%'+source+'%', '%'+author+'%')
    return where, whereData

  # 添加
  def Add(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    base64 = Util.Trim(param['img']) if 'img' in param.keys() else ''
    cid = Util.Trim(param['cid']) if 'cid' in param.keys() else ''
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    source = Util.Trim(param['source']) if 'source' in param.keys() else ''
    author = Util.Trim(param['author']) if 'author' in param.keys() else ''
    summary = Util.Trim(param['summary']) if 'summary' in param.keys() else ''
    if base64=='' : return self.GetJSON({'code':4000, 'msg':'请上传封面图!'})
    if cid=='' : return self.GetJSON({'code':4000, 'msg':'请选择分类!'})
    if len(title)<2 or len(title)>30 : return self.GetJSON({'code':4000, 'msg':'新闻标题2～30字符!'})
    # 封面图
    path = self.ImgDir+'img/'
    img = Upload.Base64({'path':path, 'base64':base64})
    # 模型
    model = WebNewsM()
    conn = model.DBConn()
    try:
      conn.begin()
      cs = conn.cursor()
      # 信息
      m1 = WebNewsM()
      m1.Values({'cid':cid, 'title':title, 'source':source, 'author':author, 'summary':summary, 'ctime':Util.Time(), 'utime':Util.Time(), 'img':path+img})
      sql, args = m1.InsertSQL()
      cs.execute(sql, args)
      id = model.LastInsertId(cs)
      # 内容
      m2 = WebNewsHtml()
      m2.Values({'nid':id})
      sql, args = m2.InsertSQL()
      cs.execute(sql, args)
      # 提交
      cs.close()
      conn.commit()
      res = {'code':0, 'msg':'成功'}
    except Exception as e:
      conn.rollback()
      FileEo.Root = Env.root_dir
      FileEo.RemoveAll(path+img)
      res = {'code':5000, 'msg':'添加失败!'}
    finally :
      conn.close()
    # 返回
    return self.GetJSON(res)

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not id or not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    base64 = Util.Trim(param['img']) if 'img' in param.keys() else ''
    cid = Util.Trim(param['cid']) if 'cid' in param.keys() else ''
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    source = Util.Trim(param['source']) if 'source' in param.keys() else ''
    author = Util.Trim(param['author']) if 'author' in param.keys() else ''
    summary = Util.Trim(param['summary']) if 'summary' in param.keys() else ''
    if base64=='' : return self.GetJSON({'code':4000, 'msg':'请上传封面图!'})
    if cid=='' : return self.GetJSON({'code':4000, 'msg':'请选择分类!'})
    if len(title)<2 or len(title)>30 : return self.GetJSON({'code':4000, 'msg':'新闻标题2～30字符!'})
    # 封面图
    img = ''
    path = self.ImgDir+'img/'
    FileEo.Root = Env.root_dir
    if base64[0:4]!='http' :
      img = Upload.Base64({'path':path, 'base64':base64})
      # 清理封面
      m1 = WebNewsM()
      m1.Columns('img')
      m1.Where('id=%s',id)
      tmp = m1.FindFirst()
      FileEo.RemoveAll(tmp['img'])
    # 模型
    m = WebNewsM()
    data = {'cid':cid, 'title':title, 'source':source, 'author':author, 'summary':summary, 'utime':Util.Time()}
    if img!='' : data['img']=path+img
    m.Set(data)
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      if img!='' : FileEo.RemoveAll(path+img)
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 删除
  def Del(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    ids = Util.Implode(',', param)
    # 封面图
    m = WebNewsM()
    m.Columns('id', 'img')
    m.Where('id in('+ids+')')
    imgList = m.Find()
    # 模型
    model = WebNewsM()
    conn = model.DBConn()
    try:
      conn.begin()
      cs = conn.cursor()
      # 信息
      m1 = WebNewsM()
      m1.Where('id in('+ids+')')
      sql, args = m1.DeleteSQL()
      cs.execute(sql, args)
      # 内容
      m2 = WebNewsHtml()
      m2.Where('nid in('+ids+')')
      sql, args = m2.DeleteSQL()
      cs.execute(sql, args)
      # 提交
      conn.commit()
      # 清理图片
      FileEo.Root = Env.root_dir
      for v in imgList :
        FileEo.RemoveAll(v['img'])
        FileEo.RemoveAll(self.ImgDir+v['id']+'/')
      res = {'code':0, 'msg':'成功'}
    except Exception as e:
      conn.rollback()
      res = {'code':5000, 'msg':'添加失败!'}
    finally :
      conn.close()
    # 返回
    return self.GetJSON(res)

  # 状态
  def State(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    state = self.JsonName(json, 'state')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not id :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 模型
    m = WebNewsM()
    m.Set({'state': '1' if state else '0', 'utime': Util.Time()})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 分类-获取
  def GetClass(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 查询
    m = WebNewsClass()
    m.Columns('id', 'name')
    m.Where('state=%s', '1')
    m.Order('sort DESC')
    list = m.Find()
    # 数据
    data = []
    for v in list :
      data += [{'label':v['name'], 'value':v['id']}]
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'data':data})

  # 内容-获取
  def GetContent(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    nid = self.JsonName(json, 'id')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 查询
    m = WebNewsHtml()
    m.Columns('content')
    m.Where('nid=%s', nid)
    data = m.FindFirst()
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'content':data['content']})

  # 内容-修改
  def Content(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    id = Util.Trim(param['id']) if 'id' in param.keys() else ''
    content = Util.Trim(param['content']) if 'content' in param.keys() else ''
    # 图片回收
    Upload.HtmlImgClear(content, self.ImgDir+id+'/')
    # 模型
    m = WebNewsHtml()
    m.Set({'content':content})
    m.Where('nid=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 内容-图片
  def UpImg(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    base64 = self.JsonName(json, 'base64')
    id = self.JsonName(json, 'id')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not base64 : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 上传
    path = self.ImgDir+id+'/'
    img = Upload.Base64({'path':path, 'base64':base64})
    if not img :
      return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'img':Data.Img(path+img)})

